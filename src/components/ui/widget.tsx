import * as React from "react";
import * as WidgetPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Widget = WidgetPrimitive.Root;

const WidgetTrigger = WidgetPrimitive.Trigger;

const WidgetContent = React.forwardRef<
  React.ElementRef<typeof WidgetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof WidgetPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <WidgetPrimitive.Portal>
    <div id="chatbot-widget">
      <WidgetPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-[423px] h-[80vh] 2xl:h-[70vh] rounded-[18px] overflow-hidden border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative",
          className
        )}
        {...props}
      />
    </div>
  </WidgetPrimitive.Portal>
));
WidgetContent.displayName = WidgetPrimitive.Content.displayName;

export { Widget, WidgetTrigger, WidgetContent };
