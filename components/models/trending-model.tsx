
import UseModel from "@/hooks/use-model-hook"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"

const TrendingModel = () => {
  const model = UseModel()

  const isVisible = model.isOpen && model.label === "trending"
  const handleClose = () => {
    
    model.onClose();
  }
  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
       <DialogContent>
    <DialogHeader>
      <DialogTitle>Trending</DialogTitle>
      <DialogDescription>We are currently working on it , stay on it!</DialogDescription>
    </DialogHeader>
  </DialogContent>
    </Dialog>
  )
}

export default TrendingModel