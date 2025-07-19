import { useState } from "react";

export function TypingOnHover({ 
  text, 
  animationDuration = 300, 
  animationDelay = 50, 
  className = '' 
}) {
  const [isHover, setHover] = useState(true);

  return (
    <div
      onMouseEnter={() => setHover(false)}
      onMouseLeave={() => setHover(true)}
      className="flex items-center overflow-hidden select-none"
    >
      {text.split('').map((char, index) => {
        const delay = index * animationDelay;

        return (
          <span
            key={index}
            className={`inline-block relative ${className}`}
            style={{
              transition: `transform ${animationDuration}ms ease ${delay}ms`,
              transform: isHover ? 'translateY(0)' : 'translateY(100%)',
              opacity: isHover ? 1 : 0,
              transitionProperty: 'transform, opacity',
              display: char === ' ' ? 'inline-block' : 'inline-block',
              width: char === ' ' ? '0.5ch' : 'auto',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
