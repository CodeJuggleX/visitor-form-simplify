
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckIcon, ChevronDown, Clock, Send, Users } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Define the form schema with validation rules
const formSchema = z.object({
  fullName: z.string().min(3, { message: "ФИО должно содержать не менее 3 символов" }),
  organization: z.string().min(2, { message: "Укажите вашу организацию" }),
  visitDuration: z.string().min(1, { message: "Укажите планируемое время пребывания" }),
  recipient: z.string({ required_error: "Выберите получателя" }),
  roomNumber: z.string().min(1, { message: "Укажите номер кабинета" }),
});

// Type for form values
type FormValues = z.infer<typeof formSchema>;

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
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      organization: "",
      visitDuration: "",
      recipient: "",
      roomNumber: "",
    },
  });

  // Submit handler for the form
  const onSubmit = async (values: FormValues) => {
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

  return (
    <div className="form-container max-w-lg w-full mx-auto">
      <Card className="border border-border/40 shadow-elevation bg-card/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex justify-center mb-2">
            <Badge className="bg-accent text-accent-foreground font-normal px-3 py-1" variant="secondary">
              Регистрация
            </Badge>
          </div>
          <CardTitle className="text-2xl font-medium text-center">Форма посетителя</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Заполните информацию для посещения
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">ФИО Посетителя</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Введите ваше полное имя" 
                        {...field} 
                        className="h-10 input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">Из какой организации?</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Укажите вашу организацию" 
                        {...field} 
                        className="h-10 input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visitDuration"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">Время пребывания</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Например: 1 час, 09:00-10:30" 
                          {...field} 
                          className="h-10 pl-10 input-field"
                        />
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recipient"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">Кому?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10 input-field">
                          <SelectValue placeholder="Выберите получателя" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover/95 backdrop-blur-sm border border-border/60">
                        {recipients.map((recipient) => (
                          <SelectItem 
                            key={recipient.id} 
                            value={recipient.id}
                            className="focus:bg-accent/50 cursor-pointer"
                          >
                            {recipient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roomNumber"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">Кабинет №</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Укажите номер кабинета" 
                        {...field} 
                        className="h-10 input-field"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-11 mt-6 font-medium rounded-md transition-all duration-300 bg-primary hover:bg-primary/90 hover:shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin"></div>
                    <span>Отправка...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send size={16} />
                    <span>Отправить охраннику</span>
                  </div>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6 px-8 text-xs text-muted-foreground">
          <p className="text-center">
            Нажимая кнопку "Отправить", вы принимаете ответственность за предоставленную информацию
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
