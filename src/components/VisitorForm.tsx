
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronDown, Send } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Define the form schema with validation rules
const formSchema = z.object({
  fullName: z.string().min(3, { message: "ФИО должно содержать не менее 3 символов" }),
  organization: z.string().min(2, { message: "Укажите вашу организацию" }),
  visitDuration: z.string().min(1, { message: "Укажите планируемое время пребывания" }),
  recipient: z.string({ required_error: "Выберите получателя" }),
  roomNumber: z.string().min(1, { message: "Укажите номер кабинета" }),
  responsibility: z.string().optional(),
});

// The available recipients for the dropdown
const recipients = [
  { id: "1", name: "Иванов И.И." },
  { id: "2", name: "Петров П.П." },
  { id: "3", name: "Сидоров С.С." },
  { id: "4", name: "Кузнецов К.К." },
  { id: "5", name: "Смирнов С.М." },
];

export default function VisitorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      organization: "",
      visitDuration: "",
      recipient: "",
      roomNumber: "",
      responsibility: "",
    },
  });

  // Submit handler for the form
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Show success notification
    toast.success("Форма отправлена успешно", {
      description: "Информация о посещении передана охраннику",
      position: "top-center",
    });
    
    // Log the form values
    console.log(values);
    
    // Reset form and state
    form.reset();
    setIsSubmitting(false);
  };

  const renderRequiredLabel = (label: string) => (
    <div className="flex">
      {label} <span className="text-red-500 ml-0.5">*</span>
    </div>
  );

  return (
    <div className="form-container w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          {/* Full Name Field */}
          <div className="bg-white shadow-sm rounded-none border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("ФИО Посетителя")}
                  <FormControl>
                    <Input 
                      placeholder="Мой ответ" 
                      {...field} 
                      className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Organization Field */}
          <div className="bg-white shadow-sm border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("Из какой организации?")}
                  <FormControl>
                    <Input 
                      placeholder="Мой ответ" 
                      {...field} 
                      className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Visit Duration Field */}
          <div className="bg-white shadow-sm border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="visitDuration"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("Время пребывания")}
                  <FormControl>
                    <Input 
                      placeholder="Мой ответ" 
                      {...field} 
                      className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Recipient Field */}
          <div className="bg-white shadow-sm border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("Кому?")}
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Выбрать" />
                      </SelectTrigger>
                      <SelectContent>
                        {recipients.map((recipient) => (
                          <SelectItem 
                            key={recipient.id} 
                            value={recipient.id}
                          >
                            {recipient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Room Number Field */}
          <div className="bg-white shadow-sm border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="roomNumber"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("Кабинет №")}
                  <FormControl>
                    <Input 
                      placeholder="Мой ответ" 
                      {...field} 
                      className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Responsibility Field */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-b-lg p-6">
            <FormField
              control={form.control}
              name="responsibility"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="text-base font-normal">Под ответственность</div>
                  <FormControl>
                    <Input 
                      placeholder="Мой ответ" 
                      {...field} 
                      className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-between pt-4">
            <Button 
              type="submit" 
              className="bg-[#673AB7] hover:bg-[#5E35B1] text-white rounded-md px-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  <span>Отправка...</span>
                </div>
              ) : (
                "Отправить"
              )}
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="text-[#673AB7] border-gray-300 hover:bg-[#f6f0ff]"
              onClick={() => form.reset()}
            >
              Очистить форму
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
