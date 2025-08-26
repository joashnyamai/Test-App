import React from "react";
import { useSettingsStore } from "@/store/settings-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Bell,
  Shield,
  Palette,
  Database,
  Globe,
  Download,
  Upload,
} from "lucide-react";

export const Settings = () => {
  const { settings, setSettings } = useSettingsStore();

  const handleSettingChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setSettings({ [field]: value });
  };

  const handleSaveSettings = () => {
    console.log("Saving settings...", settings);
    // Save to localStorage or API
  };

  const handleExportData = () => {
    console.log("Exporting data...");
  };

  const handleImportData = () => {
    console.log("Importing data...");
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">System Settings</h1>
        <Button onClick={handleSaveSettings} className="gap-2">
          <Save className="w-4 h-4" />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email alerts
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  handleSettingChange("emailNotifications", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Browser push notifications
                </p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) =>
                  handleSettingChange("pushNotifications", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Bug Report Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notify on new bug reports
                </p>
              </div>
              <Switch
                checked={settings.bugReportAlerts}
                onCheckedChange={(checked) =>
                  handleSettingChange("bugReportAlerts", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>QA Report Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notify on QA report updates
                </p>
              </div>
              <Switch
                checked={settings.qaReportAlerts}
                onCheckedChange={(checked) =>
                  handleSettingChange("qaReportAlerts", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Display
            </CardTitle>
            <CardDescription>
              Customize the appearance and language
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value) => handleSettingChange("theme", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => handleSettingChange("language", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select
                value={settings.timezone}
                onValueChange={(value) => handleSettingChange("timezone", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC+3">
                    East Africa Time (UTC+3)
                  </SelectItem>
                  <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                  <SelectItem value="UTC-5">EST (UTC-5)</SelectItem>
                  <SelectItem value="UTC+8">CST (UTC+8)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Manage your data backup and export settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically backup data
                </p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) =>
                  handleSettingChange("autoBackup", checked)
                }
              />
            </div>

            {settings.autoBackup && (
              <div className="space-y-2">
                <Label>Backup Frequency</Label>
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) =>
                    handleSettingChange("backupFrequency", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Export Format</Label>
              <Select
                value={settings.exportFormat}
                onValueChange={(value) =>
                  handleSettingChange("exportFormat", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleExportData}
                className="flex-1 gap-2"
              >
                <Download className="w-4 h-4" />
                Export Data
              </Button>
              <Button
                variant="outline"
                onClick={handleImportData}
                className="flex-1 gap-2"
              >
                <Upload className="w-4 h-4" />
                Import Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              System
            </CardTitle>
            <CardDescription>
              Advanced system configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) =>
                  handleSettingChange("sessionTimeout", parseInt(e.target.value))
                }
                min={5}
                max={120}
              />
            </div>

            <div className="space-y-2">
              <Label>Maximum File Size (MB)</Label>
              <Input
                type="number"
                value={settings.maxFileSize}
                onChange={(e) =>
                  handleSettingChange("maxFileSize", parseInt(e.target.value))
                }
                min={1}
                max={100}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>System Information</Label>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Version:</span>
                  <Badge variant="secondary">v1.0.0</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>2024-01-15</span>
                </div>
                <div className="flex justify-between">
                  <span>Storage Used:</span>
                  <span>2.5 MB / 100 MB</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Settings */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Advanced Settings
          </CardTitle>
          <CardDescription>
            Configure advanced system preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full">
              Clear Cache
            </Button>
            <Button variant="outline" className="w-full">
              Reset Preferences
            </Button>
            <Button variant="outline" className="w-full">
              View Logs
            </Button>
            <Button variant="outline" className="w-full">
              System Diagnostics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
