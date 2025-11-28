import { InquiryForm } from "@/components/InquiryForm";

const Index = () => {
  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6">
      {/* Decorative background pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L30 60M0 30L60 30' stroke='%239370DB' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Main Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden">
          {/* Elegant top accent */}
          <div className="h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
          
          <div className="p-8 sm:p-12 md:p-16">
            {/* Header with Japanese elegance */}
            <header className="text-center mb-12">
              {/* Decorative element */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
                <span className="text-primary/60 text-sm tracking-[0.3em]">SMART4A</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-4 tracking-wide">
                服務詢價與需求確認單
              </h1>
              
              <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed">
                請勾選您的需求，我們將根據您的選擇
                <br className="hidden sm:block" />
                提供專業的服務規劃
              </p>
              
              {/* Decorative divider */}
              <div className="mt-8 flex items-center justify-center">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-border" />
                <div className="mx-4 w-2 h-2 rounded-full bg-primary/30" />
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-border" />
              </div>
            </header>

            {/* Form */}
            <InquiryForm />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 text-sm text-muted-foreground/70">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-8 bg-border" />
            <span className="text-xs tracking-wider">✦</span>
            <div className="h-px w-8 bg-border" />
          </div>
          © 2024 Smart4A. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

export default Index;
