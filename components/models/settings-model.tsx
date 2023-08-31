
import UseModel from "@/hooks/use-model-hook"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"

const SettingsModel = () => {
  const model = UseModel()

  const isVisible = model.isOpen && model.label === "settings"
  const handleClose = () => {
    
    model.onClose();
  }
  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
       <DialogContent>
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>
      
    </DialogHeader>
  </DialogContent>
    </Dialog>
  )
}

export default SettingsModel