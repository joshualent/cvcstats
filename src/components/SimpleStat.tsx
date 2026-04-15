export default function SimpleStat({
  label,
  value,
  isPercent = false,
}: {
  label: string
  value: number | undefined
  isPercent?: boolean
}) {
  if (!value) {
    return <></>
  }

  const displayValue = isPercent
    ? `${value.toPrecision(4)}%`
    : value % 1 === 0
      ? value
      : value.toFixed(3)

  return (
    <>
      <div className="text-lg">
        <span className="font-semibold text-secondary-foreground">
          {label}:{' '}
        </span>
        <span className="font-mono">{displayValue}</span>
      </div>
    </>
  )
}
