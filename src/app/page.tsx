'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'

// Safe QR Code component that handles SSR gracefully
function SafeQRCodeCanvas(props: any) {
  const [QRCodeComponent, setQRCodeComponent] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Dynamically import qrcode.react only on client side
    import('qrcode.react').then((mod) => {
      setQRCodeComponent(() => mod.QRCodeCanvas)
    }).catch((err) => {
      setError('Failed to load QR code library')
      console.error('Error loading QR code library:', err)
    })
  }, [])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!QRCodeComponent) {
    return <div className="w-full h-full min-h-[256px] bg-muted animate-pulse rounded" />
  }

  return <QRCodeComponent {...props} />
}
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import { Download, QrCode, Palette, Settings, Wifi, Link, Phone, Mail, FileText, Image as ImageIcon, X, Layers, Github } from 'lucide-react'

type DataType = 'url' | 'text' | 'email' | 'phone' | 'wifi'
type ErrorLevel = 'L' | 'M' | 'Q' | 'H'
type BackgroundMode = 'solid' | 'image'
type LogoSizeMode = 'manual' | 'auto'

interface QRData {
  url: string
  text: string
  email: string
  emailSubject: string
  emailBody: string
  phone: string
  wifiSSID: string
  wifiPassword: string
  wifiSecurity: 'WPA' | 'WEP' | 'nopass'
}

export default function QRGenerator() {
  const [dataType, setDataType] = useState<DataType>('url')
  const [qrData, setQrData] = useState<QRData>({
    url: '',
    text: '',
    email: '',
    emailSubject: '',
    emailBody: '',
    phone: '',
    wifiSSID: '',
    wifiPassword: '',
    wifiSecurity: 'WPA'
  })
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>('solid')
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [backgroundOpacity, setBackgroundOpacity] = useState([100])
  const [backgroundDragOver, setBackgroundDragOver] = useState(false)
  const [errorLevel, setErrorLevel] = useState<ErrorLevel>('M')
  const [size, setSize] = useState([256])
  const [generatedValue, setGeneratedValue] = useState<string>('')
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const qrCodeRef = useRef<HTMLCanvasElement>(null)
  const logoRef = useRef<HTMLInputElement>(null)
  const backgroundRef = useRef<HTMLInputElement>(null)
  const [logo, setLogo] = useState<string | null>(null)
  const [logoDimensions, setLogoDimensions] = useState<{ width: number; height: number } | null>(null)
  const [logoSizeMode, setLogoSizeMode] = useState<LogoSizeMode>('auto')
  const [logoSize, setLogoSize] = useState([20]) // Percentage of QR code size

  // Ensure component is mounted before accessing window
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Detect mobile screen size
  useEffect(() => {
    if (!isMounted) return
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [isMounted])

  // Merge background, QR code and logo on canvas
  const mergeQR = useCallback(async () => {
    if (!isMounted || !canvasRef.current || !qrCodeRef.current) return

    const canvas = canvasRef.current
    const qrCanvas = qrCodeRef.current
    
    const qrSize = Math.min(size[0], isMobile ? 280 : size[0])
    canvas.width = qrSize
    canvas.height = qrSize
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas with solid background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, qrSize, qrSize)

    // Draw background image if present
    if (backgroundImage && backgroundMode === 'image') {
      const bgImg = new Image()
      bgImg.onload = () => {
        // Calculate opacity
        ctx.globalAlpha = backgroundOpacity[0] / 100
        
        // Draw background image to cover entire canvas
        const scale = Math.max(qrSize / bgImg.width, qrSize / bgImg.height)
        const x = (qrSize - bgImg.width * scale) / 2
        const y = (qrSize - bgImg.height * scale) / 2
        
        ctx.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale)
        
        // Reset opacity
        ctx.globalAlpha = 1.0
        
        // Draw QR code
        ctx.drawImage(qrCanvas, 0, 0, qrSize, qrSize)

        // Draw logo if present
        if (logo) {
          const logoImg = new Image()
          logoImg.onload = () => {
            let logoWidth, logoHeight, lx, ly
            
            if (logoSizeMode === 'auto' && logoDimensions) {
              // Auto-fit: calculate optimal size maintaining aspect ratio
              const maxLogoSize = qrSize * 0.22 // Max 22% of QR code
              const aspectRatio = logoDimensions.width / logoDimensions.height
              
              if (aspectRatio >= 1) {
                // Landscape or square
                logoWidth = maxLogoSize
                logoHeight = maxLogoSize / aspectRatio
              } else {
                // Portrait
                logoHeight = maxLogoSize
                logoWidth = maxLogoSize * aspectRatio
              }
            } else {
              // Manual: use percentage
              logoWidth = (qrSize * logoSize[0]) / 100
              logoHeight = logoWidth
            }
            
            lx = (qrSize - logoWidth) / 2
            ly = (qrSize - logoHeight) / 2

            // Draw background for logo (circular with max dimension)
            const maxDim = Math.max(logoWidth, logoHeight)
            ctx.fillStyle = backgroundColor
            ctx.beginPath()
            ctx.arc(lx + maxDim/2, ly + maxDim/2, maxDim/2 + 4, 0, Math.PI * 2)
            ctx.fill()

            // Draw logo
            ctx.drawImage(logoImg, lx, ly, logoWidth, logoHeight)
          }
          logoImg.src = logo
        }
      }
      bgImg.src = backgroundImage
    } else {
      // Draw QR code
      ctx.drawImage(qrCanvas, 0, 0, qrSize, qrSize)

      // Draw logo if present
      if (logo) {
        const logoImg = new Image()
        logoImg.onload = () => {
          let logoWidth, logoHeight, x, y
          
          if (logoSizeMode === 'auto' && logoDimensions) {
            // Auto-fit: calculate optimal size maintaining aspect ratio
            const maxLogoSize = qrSize * 0.22 // Max 22% of QR code
            const aspectRatio = logoDimensions.width / logoDimensions.height
            
            if (aspectRatio >= 1) {
              // Landscape or square
              logoWidth = maxLogoSize
              logoHeight = maxLogoSize / aspectRatio
            } else {
              // Portrait
              logoHeight = maxLogoSize
              logoWidth = maxLogoSize * aspectRatio
            }
          } else {
            // Manual: use percentage
            logoWidth = (qrSize * logoSize[0]) / 100
            logoHeight = logoWidth
          }
          
          x = (qrSize - logoWidth) / 2
          y = (qrSize - logoHeight) / 2

          // Draw background for logo (circular with max dimension)
          const maxDim = Math.max(logoWidth, logoHeight)
          ctx.fillStyle = backgroundColor
          ctx.beginPath()
          ctx.arc(x + maxDim/2, y + maxDim/2, maxDim/2 + 4, 0, Math.PI * 2)
          ctx.fill()

          // Draw logo
          ctx.drawImage(logoImg, x, y, logoWidth, logoHeight)
        }
        logoImg.src = logo
      }
    }
  }, [backgroundImage, backgroundMode, backgroundOpacity, logo, logoSize, logoSizeMode, logoDimensions, size, isMobile, isMounted, backgroundColor])

  // Listen for QR code canvas changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      mergeQR()
    })
    
    if (qrCodeRef.current) {
      observer.observe(qrCodeRef.current, { attributes: true })
    }
    
    return () => observer.disconnect()
  }, [mergeQR])

  // Merge when relevant values change
  useEffect(() => {
    const timer = setTimeout(() => {
      mergeQR()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [generatedValue, foregroundColor, backgroundColor, errorLevel, size, logo, logoSize, logoSizeMode, logoDimensions, backgroundImage, backgroundMode, backgroundOpacity, mergeQR])

  // Generate QR value based on data type
  useEffect(() => {
    let value = ''

    switch (dataType) {
      case 'url':
        value = qrData.url || 'https://example.com'
        break
      case 'text':
        value = qrData.text || 'Enter your text here'
        break
      case 'email':
        const emailParts: string[] = []
        if (qrData.email) emailParts.push(qrData.email)
        if (qrData.emailSubject) emailParts.push(`subject:${qrData.emailSubject}`)
        if (qrData.emailBody) emailParts.push(`body:${qrData.emailBody}`)
        value = emailParts.length > 0 ? `mailto:${emailParts.join('?')}` : 'mailto:'
        break
      case 'phone':
        value = qrData.phone ? `tel:${qrData.phone}` : 'tel:'
        break
      case 'wifi':
        const wifiParts = [`WIFI:T:${qrData.wifiSecurity}`]
        if (qrData.wifiSSID) wifiParts.push(`S:${qrData.wifiSSID}`)
        if (qrData.wifiSecurity !== 'nopass' && qrData.wifiPassword) {
          wifiParts.push(`P:${qrData.wifiPassword}`)
        }
        wifiParts.push(';;')
        value = wifiParts.join(';')
        break
    }

    setGeneratedValue(value)
  }, [qrData, dataType])

  const handleDataChange = (field: keyof QRData, value: string) => {
    setQrData(prev => ({ ...prev, [field]: value }))
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setLogoDimensions({ width: img.width, height: img.height })
          setLogo(e.target?.result as string)
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    setLogo(null)
    setLogoDimensions(null)
    setLogoSizeMode('auto')
    setLogoSize([20])
    if (logoRef.current) {
      logoRef.current.value = ''
    }
  }

  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      processBackgroundFile(file)
    }
  }

  const processBackgroundFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setBackgroundImage(e.target?.result as string)
      setBackgroundMode('image')
    }
    reader.readAsDataURL(file)
  }

  const handleBackgroundDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setBackgroundDragOver(true)
  }

  const handleBackgroundDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setBackgroundDragOver(false)
  }

  const handleBackgroundDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setBackgroundDragOver(false)
    const file = event.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      processBackgroundFile(file)
    }
  }

  const handleRemoveBackground = () => {
    setBackgroundImage(null)
    setBackgroundMode('solid')
    if (backgroundRef.current) {
      backgroundRef.current.value = ''
    }
  }

  const downloadQRCode = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `qrcode-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getActiveIcon = () => {
    switch (dataType) {
      case 'url': return <Link className="w-4 h-4" />
      case 'text': return <FileText className="w-4 h-4" />
      case 'email': return <Mail className="w-4 h-4" />
      case 'phone': return <Phone className="w-4 h-4" />
      case 'wifi': return <Wifi className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 sm:p-2.5 rounded-lg flex-shrink-0">
              <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">QR Code Generator</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Generate custom QR codes instantly</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Left Panel - Input Options */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Content</CardTitle>
                <CardDescription>Choose the type of content to encode</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={dataType} onValueChange={(value) => setDataType(value as DataType)}>
                  <TabsList className="grid grid-cols-5 w-full overflow-x-auto">
                    <TabsTrigger value="url" className="gap-1">
                      <Link className="w-4 h-4" />
                      <span className="hidden sm:inline">URL</span>
                    </TabsTrigger>
                    <TabsTrigger value="text" className="gap-1">
                      <FileText className="w-4 h-4" />
                      <span className="hidden sm:inline">Text</span>
                    </TabsTrigger>
                    <TabsTrigger value="email" className="gap-1">
                      <Mail className="w-4 h-4" />
                      <span className="hidden sm:inline">Email</span>
                    </TabsTrigger>
                    <TabsTrigger value="phone" className="gap-1">
                      <Phone className="w-4 h-4" />
                      <span className="hidden sm:inline">Phone</span>
                    </TabsTrigger>
                    <TabsTrigger value="wifi" className="gap-1">
                      <Wifi className="w-4 h-4" />
                      <span className="hidden sm:inline">Wi-Fi</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="url" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="url-input">Website URL</Label>
                      <Input
                        id="url-input"
                        placeholder="https://example.com"
                        value={qrData.url}
                        onChange={(e) => handleDataChange('url', e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-input">Plain Text</Label>
                      <Textarea
                        id="text-input"
                        placeholder="Enter your text here"
                        value={qrData.text}
                        onChange={(e) => handleDataChange('text', e.target.value)}
                        rows={4}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="email" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-input">Email Address</Label>
                      <Input
                        id="email-input"
                        type="email"
                        placeholder="example@email.com"
                        value={qrData.email}
                        onChange={(e) => handleDataChange('email', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-subject">Subject</Label>
                      <Input
                        id="email-subject"
                        placeholder="Email subject"
                        value={qrData.emailSubject}
                        onChange={(e) => handleDataChange('emailSubject', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-body">Message</Label>
                      <Textarea
                        id="email-body"
                        placeholder="Email message body"
                        value={qrData.emailBody}
                        onChange={(e) => handleDataChange('emailBody', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone-input">Phone Number</Label>
                      <Input
                        id="phone-input"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={qrData.phone}
                        onChange={(e) => handleDataChange('phone', e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="wifi" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
                      <Input
                        id="wifi-ssid"
                        placeholder="MyWiFiNetwork"
                        value={qrData.wifiSSID}
                        onChange={(e) => handleDataChange('wifiSSID', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wifi-security">Security</Label>
                      <Select
                        value={qrData.wifiSecurity}
                        onValueChange={(value: 'WPA' | 'WEP' | 'nopass') =>
                          handleDataChange('wifiSecurity', value)
                        }
                      >
                        <SelectTrigger id="wifi-security">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WPA">WPA/WPA2</SelectItem>
                          <SelectItem value="WEP">WEP</SelectItem>
                          <SelectItem value="nopass">No Password</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {qrData.wifiSecurity !== 'nopass' && (
                      <div className="space-y-2">
                        <Label htmlFor="wifi-password">Password</Label>
                        <Input
                          id="wifi-password"
                          type="password"
                          placeholder="WiFi password"
                          value={qrData.wifiPassword}
                          onChange={(e) => handleDataChange('wifiPassword', e.target.value)}
                        />
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Error Correction Level */}
                <div className="space-y-2">
                  <Label>Error Correction Level</Label>
                  <Select value={errorLevel} onValueChange={(value: ErrorLevel) => setErrorLevel(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Low (7%)</SelectItem>
                      <SelectItem value="M">Medium (15%)</SelectItem>
                      <SelectItem value="Q">Quartile (25%)</SelectItem>
                      <SelectItem value="H">High (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Higher error correction allows QR code to be scanned even if partially damaged. Recommended for logo/background: High.
                  </p>
                </div>

                <Separator />

                {/* Size */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Label>QR Code Size</Label>
                    <span className="text-sm text-muted-foreground">{size[0]}x{size[0]}px</span>
                  </div>
                  <Slider
                    min={128}
                    max={512}
                    step={32}
                    value={size}
                    onValueChange={setSize}
                    className="w-full"
                  />
                </div>

                <Separator />

                {/* Background Mode and Colors */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Background
                  </Label>
                  
                  <div className="space-y-3">
                    <Select value={backgroundMode} onValueChange={(value: BackgroundMode) => setBackgroundMode(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid">Solid Color</SelectItem>
                        <SelectItem value="image">Custom Image</SelectItem>
                      </SelectContent>
                    </Select>

                    {backgroundMode === 'solid' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="foreground" className="text-sm">QR Color</Label>
                          <div className="flex gap-2">
                            <Input
                              id="foreground"
                              type="color"
                              value={foregroundColor}
                              onChange={(e) => setForegroundColor(e.target.value)}
                              className="w-12 h-10 p-1 cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={foregroundColor}
                              onChange={(e) => setForegroundColor(e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="background" className="text-sm">Background</Label>
                          <div className="flex gap-2">
                            <Input
                              id="background"
                              type="color"
                              value={backgroundColor}
                              onChange={(e) => setBackgroundColor(e.target.value)}
                              className="w-12 h-10 p-1 cursor-pointer"
                            />
                            <Input
                              type="text"
                              value={backgroundColor}
                              onChange={(e) => setBackgroundColor(e.target.value)}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {backgroundMode === 'image' && !backgroundImage && (
                      <div>
                        <div
                          onDragOver={handleBackgroundDragOver}
                          onDragLeave={handleBackgroundDragLeave}
                          onDrop={handleBackgroundDrop}
                          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                            backgroundDragOver 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50 hover:bg-muted/50'
                          }`}
                          onClick={() => backgroundRef.current?.click()}
                        >
                          <Input
                            ref={backgroundRef}
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className="pointer-events-none">
                            <Layers className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                            <p className="text-sm font-medium mb-1">Click or drag & drop</p>
                            <p className="text-xs text-muted-foreground">
                              Upload a background image for your QR code
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-1">
                              Supports PNG, JPG, JPEG, GIF, WebP
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {backgroundMode === 'image' && backgroundImage && (
                      <div className="space-y-3">
                        <div 
                          className="relative group cursor-pointer"
                          onClick={() => backgroundRef.current?.click()}
                        >
                          <img 
                            src={backgroundImage} 
                            alt="Background preview" 
                            className="w-full h-32 object-cover rounded-lg border-2 border-border transition-opacity group-hover:opacity-90"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-lg">
                            <p className="text-white text-sm font-medium flex items-center gap-2">
                              <ImageIcon className="w-4 h-4" />
                              Click to change
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            Image loaded. Adjust opacity or colors below.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveBackground}
                            className="flex-shrink-0"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="bg-opacity" className="text-sm">Background Opacity</Label>
                            <span className="text-xs text-muted-foreground">{backgroundOpacity[0]}%</span>
                          </div>
                          <Slider
                            id="bg-opacity"
                            min={10}
                            max={100}
                            step={5}
                            value={backgroundOpacity}
                            onValueChange={setBackgroundOpacity}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            Adjust background opacity for better QR code visibility.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="foreground-img" className="text-sm">QR Color</Label>
                            <div className="flex gap-2">
                              <Input
                                id="foreground-img"
                                type="color"
                                value={foregroundColor}
                                onChange={(e) => setForegroundColor(e.target.value)}
                                className="w-12 h-10 p-1 cursor-pointer"
                              />
                              <Input
                                type="text"
                                value={foregroundColor}
                                onChange={(e) => setForegroundColor(e.target.value)}
                                className="flex-1"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="background-color-img" className="text-sm">Fallback Color</Label>
                            <div className="flex gap-2">
                              <Input
                                id="background-color-img"
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                className="w-12 h-10 p-1 cursor-pointer"
                              />
                              <Input
                                type="text"
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)}
                                className="flex-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Logo Upload */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Logo (Optional)
                  </Label>
                  
                  {!logo ? (
                    <div>
                      <Input
                        ref={logoRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Upload a logo to display in the center of the QR code. Recommended: PNG with transparent background.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <img 
                          src={logo} 
                          alt="Logo preview" 
                          className="w-12 h-12 object-contain bg-white rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">Logo uploaded</p>
                          <p className="text-xs text-muted-foreground">
                            {logoDimensions && `${logoDimensions.width}x${logoDimensions.height}px`}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveLogo}
                          className="flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="logo-size-mode" className="text-sm">Logo Size Mode</Label>
                        <Select
                          value={logoSizeMode} 
                          onValueChange={(value: LogoSizeMode) => setLogoSizeMode(value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto-Fit (Recommended)</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
                        {logoSizeMode === 'auto' && (
                          <p className="text-xs text-muted-foreground">
                            Logo size automatically adjusts to fit photo dimensions while maintaining aspect ratio. Maximum 22% of QR code.
                          </p>
                        )}
                      </div>
                      
                      {logoSizeMode === 'manual' && (
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="logo-size" className="text-sm">Logo Size</Label>
                            <span className="text-xs text-muted-foreground">{logoSize[0]}%</span>
                          </div>
                          <Slider
                            id="logo-size"
                            min={10}
                            max={30}
                            step={2}
                            value={logoSize}
                            onValueChange={setLogoSize}
                            className="w-full"
                          />
                          <p className="text-xs text-muted-foreground">
                            Logo size as a percentage of QR code. Larger logos may affect scanability.
                          </p>
                        </div>
                      )}
                      
                      {logoSizeMode === 'auto' && logoDimensions && (
                        <div className="space-y-2">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium">Aspect Ratio:</span> {logoDimensions.width} : {logoDimensions.height}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Logo will be sized to {logoDimensions.width > logoDimensions.height ? 'fit height' : 'fit width'} within 22% of QR code.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - QR Preview */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="lg:sticky top-4 sm:top-6 lg:top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Preview
                </CardTitle>
                <CardDescription>Your QR code will appear here</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* QR Code Display */}
                <div className="flex flex-col items-center justify-center p-4 sm:p-8 bg-white dark:bg-slate-900 rounded-lg border-2 border-dashed">
                  <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto"
                    style={{ display: isMounted ? 'block' : 'none' }}
                  />
                  {!isMounted && (
                    <div className="w-[256px] h-[256px] bg-muted animate-pulse rounded" />
                  )}
                  {/* Hidden QR code canvas for merging */}
                  <div className="hidden">
                    <SafeQRCodeCanvas
                      ref={qrCodeRef}
                      value={generatedValue}
                      size={Math.min(size[0], isMobile ? 280 : size[0])}
                      fgColor={foregroundColor}
                      bgColor={backgroundMode === 'solid' ? backgroundColor : 'transparent'}
                      level={errorLevel}
                      includeMargin={true}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm flex-wrap">
                    <div className="bg-muted px-2 py-1 rounded flex items-center gap-1">
                      {getActiveIcon()}
                      <span className="font-medium capitalize">{dataType}</span>
                    </div>
                    {logo && (
                      <div className="bg-muted px-2 py-1 rounded flex items-center gap-1">
                        <ImageIcon className="w-4 h-4" />
                        <span className="font-medium">Logo</span>
                      </div>
                    )}
                    {backgroundMode === 'image' && backgroundImage && (
                      <div className="bg-muted px-2 py-1 rounded flex items-center gap-1">
                        <Layers className="w-4 h-4" />
                        <span className="font-medium">Bg Image</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Error Correction: <span className="font-medium">{errorLevel}</span>
                  </p>
                </div>

                {/* Download Button */}
                <Button
                  onClick={downloadQRCode}
                  className="w-full"
                  size={isMobile ? "default" : "lg"}
                  disabled={!generatedValue || generatedValue === ''}
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="text-sm sm:text-base">Download PNG</span>
                </Button>

                {/* Tips */}
                <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-2">
                  <h4 className="font-semibold text-xs sm:text-sm">Tips</h4>
                  <ul className="text-[11px] sm:text-xs text-muted-foreground space-y-1">
                    <li>• Use high contrast colors for better scanning</li>
                    <li>• Test your QR code before printing</li>
                    <li>• Higher error correction for logos, backgrounds, and printed QR codes</li>
                    <li>• Minimum recommended size: 2cm x 2cm for print</li>
                    <li>• Use Auto-Fit logo mode for best results with different aspect ratios</li>
                    <li>• Keep logo size below 25% for best scanability</li>
                    <li>• Adjust background opacity to ensure QR code remains readable</li>
                    <li>• Use light or subtle backgrounds for best results</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm mt-auto">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <span>QR Code Generator - Generate custom QR codes for any purpose</span>
            <a
              href="https://github.com/biezz-2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>biezz-2</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
