
import VisitorForm from "@/components/VisitorForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f0f0f0] px-4 py-12">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white rounded-t-lg shadow-sm px-6 py-6 border-t-8 border-[#673AB7]">
          <h1 className="text-2xl font-medium mb-2">
            Форма для входа в здание МЭКР
          </h1>
          <p className="text-sm text-gray-500">
            Пожалуйста, заполните все необходимые поля для регистрации вашего визита
          </p>
        </div>
        
        <div className="w-full">
          <VisitorForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
