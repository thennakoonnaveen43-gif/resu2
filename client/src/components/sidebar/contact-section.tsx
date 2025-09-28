import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ResumeData } from "@shared/schema";

interface ContactSectionProps {
  data: ResumeData;
  onDataChange: (data: Partial<ResumeData>) => void;
}

export default function ContactSection({ data, onDataChange }: ContactSectionProps) {
  const updateContact = (field: keyof typeof data.contact, value: string) => {
    onDataChange({
      contact: {
        ...data.contact,
        [field]: value,
      },
    });
  };

  return (
    <div className="p-6">
      <h4 className="font-medium text-foreground mb-4">Contact Information</h4>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={data.contact.email}
            onChange={(e) => updateContact("email", e.target.value)}
            placeholder="your.email@example.com"
            data-testid="input-email"
          />
        </div>
        
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-foreground mb-2">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            value={data.contact.phone}
            onChange={(e) => updateContact("phone", e.target.value)}
            placeholder="+1-234-567-8901"
            data-testid="input-phone"
          />
        </div>
        
        <div>
          <Label htmlFor="linkedin" className="text-sm font-medium text-foreground mb-2">
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            type="url"
            value={data.contact.linkedin}
            onChange={(e) => updateContact("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/yourname"
            data-testid="input-linkedin"
          />
        </div>
        
        <div>
          <Label htmlFor="location" className="text-sm font-medium text-foreground mb-2">
            Location
          </Label>
          <Input
            id="location"
            value={data.contact.location}
            onChange={(e) => updateContact("location", e.target.value)}
            placeholder="City, State/Country"
            data-testid="input-location"
          />
        </div>
      </div>
    </div>
  );
}
