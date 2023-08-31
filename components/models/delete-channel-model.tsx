import UseModel from "@/hooks/use-model-hook"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"


const DeleteChannel = () => {
  const model = UseModel()

  const isVisible = model.isOpen && model.label === "deleteChannel"
  const handleClose = () => {
    
    model.onClose();
  }
  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
       <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Channel</DialogTitle>
      
    </DialogHeader>
  </DialogContent>
    </Dialog>
  )
}

export default DeleteChannel