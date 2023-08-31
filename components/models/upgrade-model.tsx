
import UseModel from "@/hooks/use-model-hook"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"

const UpgradeModel = () => {
  const model = UseModel()

  const isVisible = model.isOpen && model.label === "upgrade"
  const handleClose = () => {
    
    model.onClose();
  }
  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
       <DialogContent>
    <DialogHeader>
      <DialogTitle>Upgrade</DialogTitle>
      
    </DialogHeader>
  </DialogContent>
    </Dialog>
  )
}

export default UpgradeModel