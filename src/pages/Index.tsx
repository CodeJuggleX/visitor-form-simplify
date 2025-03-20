
import VisitorForm from "@/components/VisitorForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg mx-auto mb-8 text-center">
        <div className="inline-block mb-2 px-3 py-1 bg-secondary rounded-full text-xs font-medium text-secondary-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Система регистрации
        </div>
        <h1 className="text-3xl font-medium tracking-tight mb-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Регистрация посетителя
        </h1>
        <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Пожалуйста, заполните все необходимые поля для регистрации вашего визита
        </p>
      </div>
      
      <div className="w-full animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
        <VisitorForm />
      </div>
      
      <div className="mt-8 text-xs text-muted-foreground text-center animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        &copy; {new Date().getFullYear()} Система регистрации посетителей
      </div>
    </div>
  );
};

export default Index;
