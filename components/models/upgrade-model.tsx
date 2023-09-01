
import UseModel from "@/hooks/use-model-hook"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"

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
      <DialogTitle>Upgrade to <span className="ml-1 text-indigo-500">Premium Plan</span></DialogTitle>
      <DialogDescription>Premium plan offers you 100k plus more videos to enjoy,be a premium member of vidtube.</DialogDescription>
    </DialogHeader>
    <DialogFooter><Button className="bg-indigo-500 text-white hover:bg-indigo-400   dark:bg-indigo-500 dark:text-white" >Upgrade</Button></DialogFooter>
  </DialogContent>
    </Dialog>
  )
}

export default UpgradeModel