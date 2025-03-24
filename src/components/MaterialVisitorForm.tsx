
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

// Определение схемы формы с правилами валидации
const formSchema = z.object({
  fullName: z.string().min(3, { message: "ФИО должно содержать не менее 3 символов" }),
  organization: z.string().min(2, { message: "Укажите организацию посетителя" }),
  visitPurpose: z.string().min(3, { message: "Укажите цель визита" }),
  visitTime: z.string().min(1, { message: "Укажите планируемое время пребывания" }),
  employee: z.string({ required_error: "Выберите сотрудника" }),
  officeNumber: z.string().min(1, { message: "Укажите номер кабинета" }),
  responsiblePerson: z.string().optional(),
});

// Доступные сотрудники для выпадающего списка
const employees = [
  { id: "1", name: "Иван Иванов" },
  { id: "2", name: "Мария Смирнова" },
  { id: "3", name: "Петр Петров" },
];

export default function MaterialVisitorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Инициализация формы с значениями по умолчанию
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      organization: "",
      visitPurpose: "",
      visitTime: "",
      employee: "",
      officeNumber: "",
      responsiblePerson: "",
    },
  });

  // Обработчик отправки формы
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Имитация API-запроса
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Показать уведомление об успехе
    toast.success("Информация успешно отправлена", {
      description: "Данные о посетителе переданы охраннику",
      position: "top-center",
    });
    
    // Логирование значений формы
    console.log(values);
    
    // Сброс формы и состояния
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
          {/* ФИО Поле */}
          <div className="bg-white shadow-sm rounded-none border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("ФИО Посетителя")}
                  <FormControl>
                    <Input 
                      placeholder="Введите полное имя посетителя" 
                      {...field} 
                      className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Организация Поле */}
          <div className="bg-white shadow-sm border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("Из какой организации?")}
                  <FormControl>
                    <Input 
                      placeholder="Укажите организацию посетителя" 
                      {...field} 
                      className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Цель визита Поле */}
          <div className="bg-white shadow-sm border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="visitPurpose"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("Цель визита")}
                  <FormControl>
                    <Textarea 
                      placeholder="Укажите цель визита" 
                      {...field} 
                      className="min-h-24 border-b border-gray-300 shadow-none rounded-none px-0 pt-2 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0 resize-none"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Время пребывания Поле */}
          <div className="bg-white shadow-sm border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="visitTime"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("Время пребывания")}
                  <FormControl>
                    <Input 
                      placeholder="Укажите планируемое время пребывания" 
                      {...field} 
                      className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Сотрудник Поле */}
          <div className="bg-white shadow-sm border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="employee"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("Кому?")}
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Выберите сотрудника" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem 
                            key={employee.id} 
                            value={employee.id}
                          >
                            {employee.name}
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

          {/* Номер кабинета Поле */}
          <div className="bg-white shadow-sm border-t border-x border-gray-200 p-6">
            <FormField
              control={form.control}
              name="officeNumber"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {renderRequiredLabel("Кабинет №")}
                  <FormControl>
                    <Input 
                      placeholder="Укажите номер кабинета" 
                      {...field} 
                      className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Поле ответственности */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-b-lg p-6">
            <FormField
              control={form.control}
              name="responsiblePerson"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="text-base font-normal">Под ответственность</div>
                  <FormControl>
                    <Input 
                      placeholder="Укажите ответственное лицо (необязательно)" 
                      {...field} 
                      className="border-b border-gray-300 shadow-none rounded-none px-0 h-9 focus:border-[#673AB7] focus:ring-0 focus:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Действия формы */}
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
                "Отправить охраннику"
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
