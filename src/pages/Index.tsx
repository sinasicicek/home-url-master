
import { useState } from "react";
import { Server, Globe, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Index = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddUrl = () => {
    if (!newUrl) {
      toast.error("URL alanı boş olamaz");
      return;
    }
    
    try {
      new URL(newUrl);
      setUrls([...urls, newUrl]);
      setNewUrl("");
      toast.success("URL başarıyla eklendi");
    } catch {
      toast.error("Geçersiz URL formatı");
    }
  };

  const handleDeleteUrl = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
    toast.success("URL başarıyla silindi");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Ana Sunucu Yönetimi</h1>
          <p className="text-gray-600">Sunucu durumunuzu ve URL'lerinizi yönetin</p>
        </div>

        {/* Server Status Card */}
        <Card className="p-6 backdrop-blur-sm bg-white/80 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-4">
            <Server className="w-8 h-8 text-green-500" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Sunucu Durumu</h2>
              <p className="text-green-500">Çalışıyor</p>
            </div>
          </div>
        </Card>

        {/* URL Management Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">URL Yönetimi</h2>
          
          <div className="flex gap-3">
            <Input
              placeholder="https://example.com"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="backdrop-blur-sm bg-white/80"
            />
            <Button
              onClick={handleAddUrl}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white"
            >
              <Plus className="w-4 h-4" />
              Ekle
            </Button>
          </div>

          {/* URL List */}
          <div className="space-y-3">
            {urls.map((url, index) => (
              <Card key={index} className="p-4 backdrop-blur-sm bg-white/80">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <a href={url} target="_blank" rel="noopener noreferrer" 
                       className="text-gray-700 hover:text-black transition-colors">
                      {url}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteUrl(index)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
