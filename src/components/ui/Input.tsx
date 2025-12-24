import { forwardRef } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]): string {
  return twMerge(clsx(inputs))
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helperText, leftIcon, rightIcon, className, id, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="text-navy-700 mb-1.5 block text-sm font-medium">
          {label}
          {props.required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="text-navy-400 absolute top-1/2 left-3 -translate-y-1/2">{leftIcon}</div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
            'placeholder:text-navy-300',
            'transition-colors duration-200',
            'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
            'disabled:bg-cream-100 disabled:text-navy-400 disabled:cursor-not-allowed',
            error ? 'border-red-500 focus:ring-red-500' : 'border-cream-300 hover:border-cream-400',
            leftIcon ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        {rightIcon && (
          <div className="text-navy-400 absolute top-1/2 right-3 -translate-y-1/2">{rightIcon}</div>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className="text-navy-400 mt-1.5 text-sm">
          {helperText}
        </p>
      )}
    </div>
  )
})

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, helperText, className, id, ...props },
  ref
) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="text-navy-700 mb-1.5 block text-sm font-medium">
          {label}
          {props.required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={cn(
          'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
          'placeholder:text-navy-300',
          'transition-colors duration-200',
          'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
          'disabled:bg-cream-100 disabled:text-navy-400 disabled:cursor-not-allowed',
          'min-h-[120px] resize-y',
          error ? 'border-red-500 focus:ring-red-500' : 'border-cream-300 hover:border-cream-400',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
        }
        {...props}
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${textareaId}-helper`} className="text-navy-400 mt-1.5 text-sm">
          {helperText}
        </p>
      )}
    </div>
  )
})

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, helperText, options, placeholder, className, id, ...props },
  ref
) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="text-navy-700 mb-1.5 block text-sm font-medium">
          {label}
          {props.required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'text-navy-700 w-full rounded-xl border bg-white px-4 py-3',
            'cursor-pointer appearance-none',
            'transition-colors duration-200',
            'focus:ring-gold-500 focus:border-transparent focus:ring-2 focus:outline-none',
            'disabled:bg-cream-100 disabled:text-navy-400 disabled:cursor-not-allowed',
            error ? 'border-red-500 focus:ring-red-500' : 'border-cream-300 hover:border-cream-400',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="text-navy-400 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p id={`${selectId}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${selectId}-helper`} className="text-navy-400 mt-1.5 text-sm">
          {helperText}
        </p>
      )}
    </div>
  )
})
