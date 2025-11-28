interface PriceSummaryProps {
  total: number;
  hasCustomPlan: boolean;
}

export function PriceSummary({ total, hasCustomPlan }: PriceSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-TW").format(price);
  };

  return (
    <div className="bg-accent/40 border border-border/50 rounded-xl p-6 sm:p-8 mt-16">
      {/* Decorative header */}
      <div className="flex items-center justify-center mb-6">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/30" />
        <span className="mx-3 text-xs text-muted-foreground tracking-wider">ESTIMATE</span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/30" />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <span className="text-muted-foreground">
          預估參考金額
        </span>
        <span className="text-3xl sm:text-4xl font-serif font-medium text-primary tabular-nums">
          NT$ {formatPrice(total)}
        </span>
      </div>
      
      {hasCustomPlan && (
        <p className="mt-5 text-destructive text-sm text-center sm:text-left">
          ※ 您勾選了客製化方案，最終報價將包含另外評估的客製化費用
        </p>
      )}
      
      <div className="mt-6 pt-5 border-t border-border/50 text-xs text-muted-foreground/70 space-y-1 text-center sm:text-right">
        <p>※ 此金額僅供參考，最終報價以正式報價單為準</p>
        <p>※ 顧問服務費用為單月計算</p>
      </div>
    </div>
  );
}
