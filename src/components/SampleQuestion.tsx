interface SampleQuestionProps {
  question: string
  onClick: () => void
}

export default function SampleQuestion({
  question,
  onClick,
}: SampleQuestionProps) {
  return (
    <a
      className='basis-5/6 xs:basis-48 py-3 px-4 cursor-pointer border-solid border-2 border-gray-600 hover:border-slate-400 rounded-md'
      onClick={onClick}
    >
      {question}
    </a>
  )
}
