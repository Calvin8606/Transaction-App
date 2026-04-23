import Button from './Button'
import Card from './Card'

export default function ErrorState({
  title,
  message,
  onRetry,
}: {
  title: string
  message: string
  onRetry?: () => void
}) {
  return (
    <Card className="error-state">
      <h2>{title}</h2>
      <p className="muted-text">{message}</p>
      {onRetry ? (
        <div style={{ marginTop: '1rem' }}>
          <Button variant="secondary" onClick={onRetry}>
            Try again
          </Button>
        </div>
      ) : null}
    </Card>
  )
}
