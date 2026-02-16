import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  iconColor?: string;
}

export function StatCard({ title, value, icon: Icon, trend, iconColor = 'text-[#0055A4]' }: StatCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="mt-2">{value}</h3>
            {trend && (
              <p className="text-xs text-muted-foreground mt-1">{trend}</p>
            )}
          </div>
          <div className={`p-3 rounded-lg bg-muted ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
