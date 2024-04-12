import React, { useRef, useEffect, TextareaHTMLAttributes } from 'react'

interface AutoResizeTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  defaultValue?: string
  handleSubmit: () => void
}

export default function AutoResizeTextarea({
  defaultValue = '',
  value,
  onChange,
  handleSubmit,
  ...props
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const textareaNode = textareaRef.current
    if (!textareaNode) return

    textareaNode.style.height = 'auto'
    textareaNode.style.height = `${textareaNode.scrollHeight}px`
  }, [value])

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <textarea
      {...props}
      value={value}
      rows={1}
      ref={textareaRef}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      style={{ height: 'auto', overflowY: 'hidden' }}
    />
  )
}
