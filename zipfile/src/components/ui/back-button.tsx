import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

interface BackButtonProps {
  onClick: () => void
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <button type="button" onClick={onClick} className="back_button cursor-pointer">
      <ChevronLeftIcon sx={{ fontSize: 16 }} />
      <span className="back_button_text">Back</span>
    </button>
  )
}
