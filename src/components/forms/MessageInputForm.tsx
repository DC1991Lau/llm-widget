import { messageInputSchema } from "@/lib/validators/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

import { Button } from "../ui/button";

import SendIcon from "@/assets/icons/send-icon.svg";
import { useConversation } from "@/hooks/useConversation";
import { Input } from "../ui/input";

const formSchema = z.object({
  text: z.string().min(1),
});

export default function MessageInputForm() {
  const { sendMessage } = useConversation();

  const form = useForm<z.infer<typeof messageInputSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: z.infer<typeof messageInputSchema>) {
    form.reset();
    await sendMessage(values);
  }

  return (
    <div className="flex items-center w-full pb-[21px] bg-white">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full gap-[14px] justify-between "
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Escreva aqui"
                    {...field}
                    className="h-10 placeholder:text-[12px] placeholder:leading-[18px] placeholder:italic placeholder:text-[#A0A0A0] text-base resize-none"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-10 h-10 flex items-center justify-center p-0"
            variant="secondary"
          >
            <img src={SendIcon} alt="" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
