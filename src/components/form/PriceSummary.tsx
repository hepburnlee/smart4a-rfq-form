import { cn } from "@/lib/utils";

interface PriceSummaryProps {
  total: number;
  hasCustomPlan: boolean;
}

export function PriceSummary({ total, hasCustomPlan }: PriceSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-TW").format(price);
  };

  return (
    <div className="bg-muted/50 border border-border rounded-xl p-8 mt-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <span className="text-lg font-semibold text-foreground">
          預估參考金額 (Estimated Total)
        </span>
        <span className="text-3xl font-bold text-primary font-mono">
          NT$ {formatPrice(total)}
        </span>
      </div>
      
      {hasCustomPlan && (
        <p className="mt-4 text-destructive font-semibold">
          * 您勾選了客製化方案，最終報價將包含另外評估的客製化費用。
        </p>
      )}
      
      <div className="mt-4 text-sm text-muted-foreground text-right space-y-1">
        <p>* 此金額僅供參考，最終報價以正式報價單為準。</p>
        <p>* 顧問服務費用為單月計算。</p>
      </div>
    </div>
  );
}
