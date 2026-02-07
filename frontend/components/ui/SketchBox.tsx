'use client'
import { RoughNotation } from "react-rough-notation";

export default function RoughNotationShowcase() {
  return (
    <div className="flex flex-col gap-8 p-10 font-sans">
      
      {/* 1. BOX (The specific request) */}
      <div>
        <RoughNotation 
          type="box" 
          show={true} 
          color="#B45309" 
          strokeWidth={2}
          padding={8}
          iterations={2}
        >
          <span className="text-2xl font-serif text-amber-900">
            box
          </span>
        </RoughNotation>
      </div>

      {/* 2. HIGHLIGHT */}
      <div>
        <RoughNotation 
          type="highlight" 
          show={true} 
          color="#fde68a" // yellow-200
          multiline={true}
          padding={[0, 2]}
          iterations={1} // 1 looks more like a real marker
        >
          <span className="text-xl text-black">
            This looks like it was highlighted with a yellow marker.
          </span>
        </RoughNotation>
      </div>

      {/* 3. UNDERLINE */}
      <div>
        <RoughNotation 
          type="underline" 
          show={true} 
          color="#EF4444" // red-500
          strokeWidth={2}
          padding={2}
        >
          <span className="text-xl font-bold">
            Important Warning
          </span>
        </RoughNotation>
      </div>

      {/* 4. CIRCLE */}
      <div>
        <RoughNotation 
          type="circle" 
          show={true} 
          color="#3B82F6" // blue-500
          strokeWidth={3}
          padding={10}
        >
          <span className="text-xl">
            Focus Here
          </span>
        </RoughNotation>
      </div>

      {/* 5. STRIKE-THROUGH */}
      <div>
        <RoughNotation 
          type="strike-through" 
          show={true} 
          color="#6B7280" // gray-500
          strokeWidth={2}
        >
          <span className="text-xl text-gray-400">
            Old Price: $100.00
          </span>
        </RoughNotation>
      </div>

      {/* 6. CROSSED-OFF (An X over the element) */}
      <div>
        <RoughNotation 
          type="crossed-off" 
          show={true} 
          color="#DC2626" // red-600
          strokeWidth={2}
        >
          <span className="text-xl">
            Do Not Enter
          </span>
        </RoughNotation>
      </div>

      {/* 7. BRACKET (Vertical lines on sides) */}
      <div>
        <RoughNotation 
          type="bracket" 
          brackets={['left', 'right']}
          show={true} 
          color="#111827" 
          strokeWidth={3}
          padding={[2, 10]}
        >
          <div className="p-2 text-xl">
            Code Block
            <br />
            Or Grouped Content
          </div>
        </RoughNotation>
      </div>

    </div>
  );
}