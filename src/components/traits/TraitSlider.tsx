import { useState, type Ref } from 'react';

import { traitNames, traitRanges } from '../../data/traits';
import type { TraitKey } from '../../types/traits';

type TraitSliderProps = {
  trait: TraitKey;
  value: number;
  desc: string;
  onChange: (trait: TraitKey, value: number) => void;
  onTabPress?: (direction: 'forward' | 'backward') => void;
  valueRef?: Ref<HTMLSpanElement>;
};

export const TraitSlider = ({
  trait,
  value,
  desc,
  onChange,
  onTabPress,
  valueRef,
}: TraitSliderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  const handleNumberClick = () => {
    setIsEditing(true);
    setInputValue(value.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue);
    if (!isNaN(numValue)) {
      onChange(trait, numValue);
    }
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const numValue = parseInt(inputValue);
      if (!isNaN(numValue)) {
        onChange(trait, numValue);
      }
      setIsEditing(false);
      onTabPress?.(e.shiftKey ? 'backward' : 'forward');
    }
  };

  return (
    <div className="trait-group group mb-12">
      <div className="flex justify-between mb-4 items-end">
        <div>
          <h3 className="text-lg font-medium text-slate-200">
            {traitNames[trait]}
          </h3>
          <p className="text-sm text-slate-300 min-h-[1.25rem] transition-colors duration-300 group-hover:text-indigo-200">
            {desc}
          </p>
        </div>
        {isEditing ? (
          <input
            type="number"
            min="0"
            max="120"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            onFocus={(e) => e.target.select()}
            autoFocus
            className="text-2xl serif text-indigo-100 w-16 text-right bg-slate-800/50 border border-indigo-500/50 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        ) : (
          <span
            data-trait={trait}
            onClick={handleNumberClick}
            ref={valueRef}
            className="text-2xl serif text-indigo-100 w-12 text-right cursor-pointer hover:text-indigo-300 hover:underline transition-colors"
            title="Click to edit"
          >
            {value}
          </span>
        )}
      </div>
      <input
        type="range"
        min="0"
        max="120"
        value={value}
        onChange={(e) => onChange(trait, Number(e.target.value))}
        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer slider-thumb focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
      />
      <div className="flex justify-between text-xs text-slate-600 mt-3 uppercase tracking-wider font-medium">
        <span>{traitRanges[trait][0]}</span>
        <span>{traitRanges[trait][1]}</span>
      </div>
    </div>
  );
};
