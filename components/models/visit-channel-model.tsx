import UseModel from "@/hooks/use-model-hook"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"



const VisitChannel = () => {
  const model = UseModel()

  const isVisible = model.isOpen && model.label === "visitChannel"
  const handleClose = () => {
    
    model.onClose();
  }
  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
       <DialogContent>
    <DialogHeader>
      <DialogTitle>Visit Channel</DialogTitle>
      
    </DialogHeader>
  </DialogContent>
    </Dialog>
  )
}

export default VisitChannel