import { InquiryForm } from "@/components/InquiryForm";

const Index = () => {
  return (
    <main className="min-h-screen bg-background py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-3xl shadow-xl border-t-8 border-primary p-6 sm:p-10 md:p-14">
          {/* Header */}
          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
              服務詢價與需求確認單
            </h1>
            <p className="text-muted-foreground text-lg">
              請勾選您的需求，我們將根據您的選擇提供專業的服務規劃。
            </p>
          </header>

          {/* Form */}
          <InquiryForm />
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-sm text-muted-foreground">
          © 2024 Smart4A. All rights reserved.
        </footer>
      </div>
    </main>
  );
};

export default Index;
