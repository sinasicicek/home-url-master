
import { useState, useEffect } from "react";
import { Server, Globe, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface UrlData {
  url: string;
  image?: string;
  title?: string;
}

const Index = () => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load URLs from localStorage on component mount
  useEffect(() => {
    const savedUrls = localStorage.getItem('urls');
    if (savedUrls) {
      setUrls(JSON.parse(savedUrls));
    }
  }, []);

  // Save URLs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('urls', JSON.stringify(urls));
  }, [urls]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleAddUrl = async () => {
    if (!newUrl) {
      toast.error("URL alanı boş olamaz");
      return;
    }
    
    try {
      new URL(newUrl);
      
      const urlData: UrlData = {
        url: newUrl,
      };

      if (selectedImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          const newUrlData = {
            ...urlData,
            image: base64String
          };
          
          setUrls(prev => [...prev, newUrlData]);
          setNewUrl("");
          setSelectedImage(null);
          toast.success("URL ve resim başarıyla eklendi");
        };
        reader.readAsDataURL(selectedImage);
      } else {
        setUrls(prev => [...prev, urlData]);
        setNewUrl("");
        toast.success("URL başarıyla eklendi");
      }
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
          
          <div className="flex flex-col gap-3">
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
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="backdrop-blur-sm bg-white/80"
              />
              {selectedImage && (
                <p className="text-sm text-green-600">Resim seçildi: {selectedImage.name}</p>
              )}
            </div>
          </div>

          {/* URL Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {urls.map((urlData, index) => (
              <Card key={index} className="overflow-hidden backdrop-blur-sm bg-white/80 transition-all duration-300 hover:shadow-xl">
                {urlData.image && (
                  <div className="relative h-40 w-full">
                    <img
                      src={urlData.image}
                      alt="URL preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-500 shrink-0" />
                      <a 
                        href={urlData.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-black transition-colors truncate"
                      >
                        {urlData.url}
                      </a>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUrl(index)}
                      className="text-gray-500 hover:text-red-500 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
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
