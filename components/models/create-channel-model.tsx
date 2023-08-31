import UseModel from "@/hooks/use-model-hook"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"

const CreateChannel = () => {

  const model = UseModel()

  const isVisible = model.isOpen && model.label === "createChannel"
  const handleClose = () => {
    
    model.onClose();
  }
  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
       <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Channel</DialogTitle>
      
    </DialogHeader>
  </DialogContent>
    </Dialog>
  )
}

export default CreateChannel