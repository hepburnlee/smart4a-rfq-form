import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/components/form/FormSection";
import { OptionCard } from "@/components/form/OptionCard";
import { PriceSummary } from "@/components/form/PriceSummary";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface FormData {
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  taxId: string;
  invoiceTitle: string;
  address: string;
  projectPlans: string[];
  customPlanDetails: string;
  consultantTier: string;
  consultantType: string;
  consultantAddonRag: string;
  techGuidance: boolean;
  techGuidanceType: string;
  techGuidanceHours: number;
  eduTraining: boolean;
  eduTrainingLevel: string;
  eduTrainingHours: number;
  coaching: boolean;
  coachType: string;
  coachHours: number;
  notes: string;
}

const CONSULTANT_PRICES: Record<string, Record<string, number>> = {
  輕量型: { 基礎費用: 30000, 指定顧問: 45000 },
  中量型: { 基礎費用: 50000, 指定顧問: 75000 },
  重量型: { 基礎費用: 100000, 指定顧問: 150000 },
};

const RAG_PRICE = 30000;

const TECH_PRICES: Record<string, number> = {
  基礎講師: 5000,
  指定講師: 7000,
};

const EDU_PRICES: Record<string, number> = {
  "基礎課程_基礎講師": 6000,
  "基礎課程_指定講師": 8000,
  "中階課程_基礎講師": 7000,
  "中階課程_指定講師": 9000,
  "進階課程_基礎講師": 8000,
  "進階課程_指定講師": 10000,
};

const COACH_PRICES: Record<string, number> = {
  "1對1_基礎": 3000,
  "1對1_指定": 4500,
  "1對多_基礎": 4500,
  "1對多_指定": 6000,
};

export function InquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    contactPerson: "",
    email: "",
    phone: "",
    taxId: "",
    invoiceTitle: "",
    address: "",
    projectPlans: [],
    customPlanDetails: "",
    consultantTier: "",
    consultantType: "基礎費用",
    consultantAddonRag: "無",
    techGuidance: false,
    techGuidanceType: "基礎講師",
    techGuidanceHours: 2,
    eduTraining: false,
    eduTrainingLevel: "基礎課程_基礎講師",
    eduTrainingHours: 3,
    coaching: false,
    coachType: "1對1_基礎",
    coachHours: 2,
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleProjectPlan = (plan: string) => {
    setFormData((prev) => ({
      ...prev,
      projectPlans: prev.projectPlans.includes(plan)
        ? prev.projectPlans.filter((p) => p !== plan)
        : [...prev.projectPlans, plan],
    }));
  };

  const totalPrice = useMemo(() => {
    let total = 0;

    // Project plans
    if (formData.projectPlans.includes("基礎陪跑方案")) total += 360000;
    if (formData.projectPlans.includes("完整轉型方案")) total += 480000;

    // Consultant
    if (formData.consultantTier && CONSULTANT_PRICES[formData.consultantTier]) {
      total += CONSULTANT_PRICES[formData.consultantTier][formData.consultantType] || 0;
      if (formData.consultantAddonRag === "加購") total += RAG_PRICE;
    }

    // Tech guidance
    if (formData.techGuidance) {
      total += (TECH_PRICES[formData.techGuidanceType] || 0) * formData.techGuidanceHours;
    }

    // Education
    if (formData.eduTraining) {
      total += (EDU_PRICES[formData.eduTrainingLevel] || 0) * formData.eduTrainingHours;
    }

    // Coaching
    if (formData.coaching) {
      total += (COACH_PRICES[formData.coachType] || 0) * formData.coachHours;
    }

    return total;
  }, [formData]);

  const hasCustomPlan = formData.projectPlans.includes("企業客製方案");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("詢價單已成功送出！我們將盡快與您聯繫。");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Contact Information */}
      <FormSection icon="🏢" title="客戶聯絡資訊">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="company">公司名稱 *</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder="例如：未來科技有限公司"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPerson">聯絡人姓名 *</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => updateField("contactPerson", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">聯絡 Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="name@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">聯絡電話 *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="0912-345-678"
              required
            />
          </div>
        </div>

        {/* Invoice Section */}
        <div className="mt-6 p-5 bg-muted/50 rounded-xl">
          <p className="text-sm text-muted-foreground font-semibold mb-4">
            ▼ 若您需要正式報價單，請填寫以下發票資訊 (選填)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="taxId">統一編號</Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={(e) => updateField("taxId", e.target.value)}
                maxLength={8}
                placeholder="8碼數字"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceTitle">發票抬頭</Label>
              <Input
                id="invoiceTitle"
                value={formData.invoiceTitle}
                onChange={(e) => updateField("invoiceTitle", e.target.value)}
                placeholder="若同公司名可留空"
              />
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <Label htmlFor="address">公司地址</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="發票地址"
            />
          </div>
        </div>
      </FormSection>

      {/* Project Plans */}
      <FormSection icon="🚀" title="陪跑與轉型方案">
        <OptionCard
          title="基礎陪跑方案"
          description="48小時專業指導、3個自動化流程導入。"
          price="NT$ 360,000"
          selected={formData.projectPlans.includes("基礎陪跑方案")}
          onSelect={() => toggleProjectPlan("基礎陪跑方案")}
        />
        <OptionCard
          title="完整轉型方案"
          description="含 AI Agent 建置、知識庫訓練、5個自動化流程導入。"
          price="NT$ 480,000"
          selected={formData.projectPlans.includes("完整轉型方案")}
          onSelect={() => toggleProjectPlan("完整轉型方案")}
        />
        <OptionCard
          title="企業客製方案"
          description="適合多部門整合、私有化部署、複雜權限管理設計。"
          priceLabel="專人評估報價"
          selected={formData.projectPlans.includes("企業客製方案")}
          onSelect={() => toggleProjectPlan("企業客製方案")}
          hasExpandableContent
        >
          <div className="space-y-2">
            <Label>請簡述您的客製化需求</Label>
            <Textarea
              value={formData.customPlanDetails}
              onChange={(e) => updateField("customPlanDetails", e.target.value)}
              placeholder="例如：我們需要將系統部署在私有雲，並串接內部的 ERP 系統..."
              rows={4}
            />
          </div>
        </OptionCard>
      </FormSection>

      {/* Consultant Services */}
      <FormSection icon="💼" title="顧問服務 (訂閱制)">
        <div className="space-y-2">
          <Label>選擇方案等級</Label>
          <Select
            value={formData.consultantTier}
            onValueChange={(value) => updateField("consultantTier", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="-- 不需此服務 --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">-- 不需此服務 --</SelectItem>
              <SelectItem value="輕量型">輕量型 (每月1次現場指導)</SelectItem>
              <SelectItem value="中量型">中量型 (每月2次現場指導)</SelectItem>
              <SelectItem value="重量型">重量型 (每週1次現場指導)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {formData.consultantTier && formData.consultantTier !== "none" && (
          <div className="mt-4 p-5 border-2 border-primary rounded-xl bg-card animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>顧問類型</Label>
                <Select
                  value={formData.consultantType}
                  onValueChange={(value) => updateField("consultantType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="基礎費用">基礎費用 (由公司指派)</SelectItem>
                    <SelectItem value="指定顧問">指定顧問費用 (+費用)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>AI Knowledge 知識庫助理 (RAG)</Label>
                <Select
                  value={formData.consultantAddonRag}
                  onValueChange={(value) => updateField("consultantAddonRag", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="無">不需要</SelectItem>
                    <SelectItem value="加購">加購服務 (訓練助理導入)</SelectItem>
                    <SelectItem value="贈送">已包含 (重量型方案免費贈送)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </FormSection>

      {/* Technical Training */}
      <FormSection icon="🛠️" title="技術指導 & 教育訓練">
        <OptionCard
          title="專案技術指導 (Level 5)"
          description="針對專案開發遇到的關鍵問題，提供 1對1 手把手指導。"
          selected={formData.techGuidance}
          onSelect={() => updateField("techGuidance", !formData.techGuidance)}
          hasExpandableContent
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>講師規格</Label>
              <Select
                value={formData.techGuidanceType}
                onValueChange={(value) => updateField("techGuidanceType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="基礎講師">基礎講師 (1對1) - NT$ 5,000/hr</SelectItem>
                  <SelectItem value="指定講師">指定講師 (1對1) - NT$ 7,000/hr</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>預計時數 (小時)</Label>
              <Input
                type="number"
                min={2}
                value={formData.techGuidanceHours}
                onChange={(e) => updateField("techGuidanceHours", parseInt(e.target.value) || 2)}
              />
            </div>
          </div>
        </OptionCard>

        <OptionCard
          title="企業教育訓練 (Level 3+)"
          description="適用 5-30人團體課程，每單元3小時。"
          selected={formData.eduTraining}
          onSelect={() => updateField("eduTraining", !formData.eduTraining)}
          hasExpandableContent
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>課程等級</Label>
              <Select
                value={formData.eduTrainingLevel}
                onValueChange={(value) => updateField("eduTrainingLevel", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="基礎課程_基礎講師">基礎課程 - 基礎講師 (團體) - NT$ 6,000/hr</SelectItem>
                  <SelectItem value="基礎課程_指定講師">基礎課程 - 指定講師 (團體) - NT$ 8,000/hr</SelectItem>
                  <SelectItem value="中階課程_基礎講師">中階課程 - 基礎講師 (團體) - NT$ 7,000/hr</SelectItem>
                  <SelectItem value="中階課程_指定講師">中階課程 - 指定講師 (團體) - NT$ 9,000/hr</SelectItem>
                  <SelectItem value="進階課程_基礎講師">進階課程 - 基礎講師 (團體) - NT$ 8,000/hr</SelectItem>
                  <SelectItem value="進階課程_指定講師">進階課程 - 指定講師 (團體) - NT$ 10,000/hr</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>預計時數 (每單元3小時)</Label>
              <Input
                type="number"
                min={3}
                step={3}
                value={formData.eduTrainingHours}
                onChange={(e) => updateField("eduTrainingHours", parseInt(e.target.value) || 3)}
              />
            </div>
          </div>
        </OptionCard>

        <OptionCard
          title="教練指導 (Level 4+)"
          description="適用 5人以下小班制、1對1或團隊帶領。"
          selected={formData.coaching}
          onSelect={() => updateField("coaching", !formData.coaching)}
          hasExpandableContent
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>指導形式</Label>
              <Select
                value={formData.coachType}
                onValueChange={(value) => updateField("coachType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1對1_基礎">1對1手把手 - 基礎教練 - NT$ 3,000/hr</SelectItem>
                  <SelectItem value="1對1_指定">1對1手把手 - 指定教練 - NT$ 4,500/hr</SelectItem>
                  <SelectItem value="1對多_基礎">1對多(團隊帶領) - 基礎教練 - NT$ 4,500/hr</SelectItem>
                  <SelectItem value="1對多_指定">1對多(團隊帶領) - 指定教練 - NT$ 6,000/hr</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>預計時數 (小時)</Label>
              <Input
                type="number"
                min={2}
                value={formData.coachHours}
                onChange={(e) => updateField("coachHours", parseInt(e.target.value) || 2)}
              />
            </div>
          </div>
        </OptionCard>
      </FormSection>

      {/* Notes */}
      <div className="mt-10 space-y-2">
        <Label htmlFor="notes">其他需求或備註</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          placeholder="請輸入您希望開始的時間，或其他特殊需求..."
          rows={4}
        />
      </div>

      {/* Price Summary */}
      <PriceSummary total={totalPrice} hasCustomPlan={hasCustomPlan} />

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full mt-6 h-16 text-lg font-bold"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin">⏳</span>
            送出中...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            送出詢價單
          </span>
        )}
      </Button>
    </form>
  );
}
