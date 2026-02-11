import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

type ChartTooltipRuntimeProps = {
  active?: boolean
  payload?: Array<{
    name?: string
    dataKey?: string
    value?: number | string
    color?: string
    payload?: Record<string, unknown>
  }>
  label?: React.ReactNode
}

export type ChartConfig = {
  [k: string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

/* -------------------------------------------------------------------------- */
/*                                ChartContainer                               */
/* -------------------------------------------------------------------------- */

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        ref={ref}
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-layer]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

/* -------------------------------------------------------------------------- */
/*                                  ChartStyle                                 */
/* -------------------------------------------------------------------------- */

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, cfg]) => cfg.color || cfg.theme
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart="${id}"] {
${colorConfig
  .map(([key, cfg]) => {
    const color =
      cfg.theme?.[theme as keyof typeof cfg.theme] || cfg.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .filter(Boolean)
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}


type TooltipItem = {
  name?: string
  dataKey?: string
  value?: number | string
  color?: string
  payload?: Record<string, unknown>
}


/* -------------------------------------------------------------------------- */
/*                              ChartTooltip                                   */
/* -------------------------------------------------------------------------- */

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
  ChartTooltipRuntimeProps & {
    hideLabel?: boolean
    hideIndicator?: boolean
    indicator?: "line" | "dot" | "dashed"
    nameKey?: string
    labelKey?: string
    labelFormatter?: (label: React.ReactNode, payload: unknown[]) => React.ReactNode
    formatter?: (
      value: number | string,
      name: string,
      item: unknown,
      index: number,
      payload: unknown
    ) => React.ReactNode
    color?: string
    labelClassName?: string
  }

>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()
    const items = (payload ?? []) as TooltipItem[]

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !items.length) return null

      const item = items[0]
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)

      const value =
        !labelKey && typeof label === "string"
          ? config[label]?.label || label
          : itemConfig?.label

      if (!value) return null

      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter ? labelFormatter(value, payload) : value}
        </div>
      )
    }, [
      items,
      hideLabel,
      label,
      labelFormatter,
      labelClassName,
      config,
      labelKey,
      payload,
    ])

    if (!active || !items.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {tooltipLabel}
        <div className="grid gap-1.5">
          {items.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor =
                color ||
                (typeof item.payload?.fill === "string" ? item.payload.fill : undefined) ||
                item.color


            return (
              <div key={index} className="flex items-center gap-2">
                {!hideIndicator && (
                  <div
                    className={cn(
                      "h-2.5 w-2.5 rounded",
                      indicator === "line" && "w-1",
                      indicator === "dashed" &&
                        "w-0 border border-dashed bg-transparent"
                    )}
                    style={{ backgroundColor: indicatorColor }}
                  />
                )}
                <span className="text-muted-foreground">
                  {itemConfig?.label || item.name}
                </span>
                {item.value != null && (
                  <span className="ml-auto font-mono">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

/* -------------------------------------------------------------------------- */
/*                                 Legend                                      */
/* -------------------------------------------------------------------------- */

type LegendItem = {
  value?: string
  dataKey?: string
  color?: string
}

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: unknown[]
    verticalAlign?: "top" | "bottom"
    hideIcon?: boolean
    nameKey?: string
  }
>(({ className, payload, verticalAlign = "bottom", hideIcon, nameKey }, ref) => {
  const { config } = useChart()
  const items = (payload ?? []) as LegendItem[]

  if (!items.length) return null

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {items.map((item, index) => {
        const key = `${nameKey || item.dataKey || "value"}`
        const itemConfig = getPayloadConfigFromPayload(config, item, key)

        return (
          <div key={index} className="flex items-center gap-1.5">
            {!hideIcon && (
              <div
                className="h-2 w-2 rounded"
                style={{ backgroundColor: item.color }}
              />
            )}
            {itemConfig?.label}
          </div>
        )
      })}
    </div>
  )
})
ChartLegendContent.displayName = "ChartLegend"

/* -------------------------------------------------------------------------- */
/*                               Helper                                         */
/* -------------------------------------------------------------------------- */

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) return undefined

  const p = payload as Record<string, unknown>
  const labelKey =
    typeof p[key] === "string"
      ? (p[key] as string)
      : typeof (p.payload as any)?.[key] === "string"
      ? ((p.payload as any)[key] as string)
      : key

  return config[labelKey] ?? config[key]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
