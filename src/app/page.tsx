
"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Tipos para la API
type Client = {
  codigo: string;
  nombre: string;
};

type Product = {
  codigo: string;
  nombre:string;
};

type GeneralData = {
  materialCode: number;
  materialName: string;
  qualityProductName: string;
  planeNumber: string;
  alternativeProductCode: string;
  grossWeight: number | null;
  netWeight: number | null;
  weightType: string;
  piecesMold: number;
  performance: number | null;
  stock: number;
  mechanizedDelivery: string | null;
  whoMechanizes: string;
  thirdCosts: number | null;
  thirdTimes: number | null;
  physicalCertificate: boolean;
  chemicalCertificate: boolean;
  createDate: string;
  modifiedDate: string;
  revision: string;
  technicalSheetStatus: string;
  modifiedUser: string;
  imageOne: string;
  imageTwo: string;
  generalRemarks: string;
}

type ToolingData = {
    clientCode: number;
    clientName: string;
    productCode: number;
    productName: string;
    traceability: boolean;
    ownModel: boolean;
    piecesMold: number;
    combinedModel: boolean;
    factoryModel: string;
    locationName: string;
    modelTypeName: string;
    numberOwnReplicas: number | null;
    modelCreateDate: string;
    modelOrigin: string;
    modelModifiedDate: string;
    modelDestiny: string;
    imageOne: string;
    imageTwo: string;
    imageThree: string | null;
    imageFour: string | null;
    observation: string;
}

type NoyeriaData = {
    clientCode: number;
    clientName: string;
    productCode: number;
    productName: string;
    nickelTake: boolean;
    nickelQuantity: number;
    nickelType: string;
    nickelHollow: string;
    nickelArmor: string;
    nickelWeight: number | null;
    paintType: string;
    imageOne: string | null;
    imageTwo: string | null;
    imageThree: string | null;
    observation: string;
};

type MoldeoData = {
    clientCode: number;
    clientName: string;
    productCode: number;
    productName: string;
    boxType: string;
    boxTopOne: number | null;
    boxTopTwo: number | null;
    boxTopThree: number | null;
    boxBelowOne: number | null;
    boxBelowTwo: number | null;
    boxBelowThree: number | null;
    kgSand: number | null;
    kgResin: number | null;
    kgCatalyst: number | null;
    rma: number | null;
    rmm: number | null;
    coolerQuantity: number | null;
    paintType: string;
    area: string;
    moldingTime: number | null;
    fillDown: string;
    fillPrincipal: string;
    fillAttack: string;
    imageOne: string | null;
    imageTwo: string | null;
    imageThree: string | null;
    observation: string;
}

type FusionData = {
    clientCode: number;
    clientName: string;
    productCode: number;
    productName: string;
    filterTemperature: string;
    filterFilled: number | null;
    filterCooled: number | null;
    observation: string;
}

type DeburredData = {
    clientCode: number;
    clientName: string;
    productCode: number;
    productName: string;
    imageOne: string | null;
    imageTwo: string | null;
    imageThree: string | null;
    imageFour: string | null;
    observation: string;
}

type ThermalData = {
    clientCode: number;
    clientName: string;
    productCode: number;
    productName: string;
    thermalTreatmentType: string;
    residenceTemperature: number;
    residenceTime: number;
    coolingMedium: string;
    hardness: number;
    observation: string;
}

type QualityData = {
    imageOne: string | null;
    imageTwo: string | null;
    observationOne: string;
    observationTwo: string;
}

type RecordData = {
    lastOrderNumber: number | null;
    lastExternalOrderNumber: string | null;
    lastOrderDate: string;
    lastQuantityOrder: number | null;
    lastProductionDate: string;
    lastQuantityProduced: number | null;
    lastAssignedStock: number | null;
    lastManufacturingOrderNumber: number | null;
    lastManufacturingOrderDate: string;
    lastQuantityManufacturingOrder: number | null;
    lastDateDelivered: string;
    lastQuantityDelivered: number | null;
    order: number | null;
    produced: number | null;
    internalScrap: number | null;
    externalScrap: number | null;
    totalScrap: number | null;
    repairs: number | null;
    delivered: number | null;
    difference: number | null;
    kgOrder: number | null;
    kgProduced: number | null;
    kgInternalScrap: number | null;
    kgExternalScrap: number | null;
    kgTotalScrap: number | null;
    kgRepairs: number | null;
    kgDelivered: number | null;
    kgDifference: number | null;
    percentageKgInternalScrap: number | null;
    percentageKgExternalScrap: number | null;
    percentageKgTotalScrap: number | null;
    percentageKgRepairs: number | null;
    percentageKgDelivered: number | null;
    percentageKgDifference: number | null;
    averageDaysLate: number | null;
};


const Placeholder = ({ text = "Sin Imagen" }: { text?: string }) => (
  <div className="w-full h-full border rounded-md flex items-center justify-center bg-muted/50 text-muted-foreground text-sm">
    {text}
  </div>
);


export default function Home() {
  const tabNames = [
    "General",
    "Herramental",
    "Noyería",
    "Moldeo",
    "Fusión",
    "Rebabado",
    "Térmico",
    "Calidad",
    "Historial",
  ];

  // Estados para la búsqueda de clientes
  const [clientCode, setClientCode] = useState("");
  const [clientName, setClientName] = useState("");
  const [selectedClientName, setSelectedClientName] = useState("");
  const [clientSearchResults, setClientSearchResults] = useState<Client[]>([]);
  const [isClientSearchLoading, setIsClientSearchLoading] = useState(false);

  // Estados para la búsqueda de productos
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [selectedProductName, setSelectedProductName] = useState("");
  const [productSearchResults, setProductSearchResults] = useState<Product[]>([]);
  const [isProductSearchLoading, setIsProductSearchLoading] = useState(false);

  // Estado para la pestaña "General"
  const [generalData, setGeneralData] = useState<GeneralData | null>(null);
  const [isGeneralDataLoading, setIsGeneralDataLoading] = useState(false);

  // Estado para la pestaña "Herramental"
  const [toolingData, setToolingData] = useState<ToolingData | null>(null);
  const [isToolingDataLoading, setIsToolingDataLoading] = useState(false);

  // Estado para la pestaña "Noyería"
  const [noyeriaData, setNoyeriaData] = useState<NoyeriaData | null>(null);
  const [isNoyeriaDataLoading, setIsNoyeriaDataLoading] = useState(false);

  // Estado para la pestaña "Moldeo"
  const [moldeoData, setMoldeoData] = useState<MoldeoData | null>(null);
  const [isMoldeoDataLoading, setIsMoldeoDataLoading] = useState(false);

  // Estado para la pestaña "Fusión"
  const [fusionData, setFusionData] = useState<FusionData | null>(null);
  const [isFusionDataLoading, setIsFusionDataLoading] = useState(false);
  
  // Estado para la pestaña "Rebabado"
  const [deburredData, setDeburredData] = useState<DeburredData | null>(null);
  const [isDeburredDataLoading, setIsDeburredDataLoading] = useState(false);

  // Estado para la pestaña "Térmico"
  const [thermalData, setThermalData] = useState<ThermalData | null>(null);
  const [isThermalDataLoading, setIsThermalDataLoading] = useState(false);

  // Estado para la pestaña "Calidad"
  const [qualityData, setQualityData] = useState<QualityData | null>(null);
  const [isQualityDataLoading, setIsQualityDataLoading] = useState(false);

  // Estado para la pestaña "Historial"
  const [recordData, setRecordData] = useState<RecordData | null>(null);
  const [isRecordDataLoading, setIsRecordDataLoading] = useState(false);


  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const searchClientsByCode = useCallback(async (code: string) => {
    if (code.length === 0) {
      setClientSearchResults([]);
      return;
    }
    setIsClientSearchLoading(true);
    try {
      const apiUrl = `${API_BASE_URL}/api/clientes/FindByCode?pClientCode=${code}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      const result = await response.json();
      const clients = (result.data || []).map((client: any) => ({
        codigo: client.codCli.toString(),
        nombre: client.nomCli,
      })) as Client[];
      setClientSearchResults(clients.slice(0, 10));
    } catch (error) {
      console.error("Error al buscar clientes:", error);
      setClientSearchResults([]);
    } finally {
      setIsClientSearchLoading(false);
    }
  }, [API_BASE_URL]);

  const searchClientsByName = useCallback(async (name: string) => {
    if (name.length === 0) {
      setClientSearchResults([]);
      return;
    }
    setIsClientSearchLoading(true);
    try {
      const apiUrl = `${API_BASE_URL}/api/clientes/FindByName?pClientName=${name}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Error en la respuesta de la API");
      const result = await response.json();
      const clients = (result.data || []).map((client: any) => ({
        codigo: client.codCli.toString(),
        nombre: client.nomCli,
      })) as Client[];
      setClientSearchResults(clients.slice(0, 10));
    } catch (error) {
      console.error("Error al buscar clientes por nombre:", error);
      setClientSearchResults([]);
    } finally {
      setIsClientSearchLoading(false);
    }
  }, [API_BASE_URL]);

  const searchProductsByCode = useCallback(async (code: string) => {
    if (code.length === 0) {
      setProductSearchResults([]);
      return;
    }
    setIsProductSearchLoading(true);
    try {
      const apiUrl = `${API_BASE_URL}/api/productos/FindByCode?pProductCode=${code}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Error en la respuesta de la API de productos");
      const result = await response.json();
      const products = (result.data || []).map((product: any) => ({
        codigo: product.codProd.toString(),
        nombre: product.nomProd,
      })) as Product[];
      setProductSearchResults(products.slice(0, 10));
    } catch (error) {
      console.error("Error al buscar productos:", error);
      setProductSearchResults([]);
    } finally {
      setIsProductSearchLoading(false);
    }
  }, [API_BASE_URL]);

  const searchProductsByName = useCallback(async (name: string) => {
    if (name.length === 0) {
      setProductSearchResults([]);
      return;
    }
    setIsProductSearchLoading(true);
    try {
      const apiUrl = `${API_BASE_URL}/api/productos/FindByName?pProductName=${name}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Error en la respuesta de la API de productos");
      const result = await response.json();
      const products = (result.data || []).map((product: any) => ({
        codigo: product.codProd.toString(),
        nombre: product.nomProd,
      })) as Product[];
      setProductSearchResults(products.slice(0, 10));
    } catch (error) {
      console.error("Error al buscar productos por nombre:", error);
      setProductSearchResults([]);
    } finally {
      setIsProductSearchLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    if (clientCode && !selectedClientName) {
      const handler = setTimeout(() => {
        searchClientsByCode(clientCode);
      }, 500);
      return () => clearTimeout(handler);
    } else {
      setClientSearchResults([]);
    }
  }, [clientCode, selectedClientName, searchClientsByCode]);

  useEffect(() => {
    if (clientName && !selectedClientName) {
      const handler = setTimeout(() => {
        searchClientsByName(clientName);
      }, 500);
      return () => clearTimeout(handler);
    } else {
      setClientSearchResults([]);
    }
  }, [clientName, selectedClientName, searchClientsByName]);

  useEffect(() => {
    if (productCode && !selectedProductName) {
      const handler = setTimeout(() => {
        searchProductsByCode(productCode);
      }, 500);
      return () => clearTimeout(handler);
    } else {
      setProductSearchResults([]);
    }
  }, [productCode, selectedProductName, searchProductsByCode]);

  useEffect(() => {
    if (productName && !selectedProductName) {
      const handler = setTimeout(() => {
        searchProductsByName(productName);
      }, 500);
      return () => clearTimeout(handler);
    } else {
      setProductSearchResults([]);
    }
  }, [productName, selectedProductName, searchProductsByName]);

 const fetchGeneralData = useCallback(async (selectedClientCode: string, selectedProductCode: string) => {
    setIsGeneralDataLoading(true);
    setGeneralData(null); 
    try {
      const apiUrl = `${API_BASE_URL}/api/productos/GetGeneralData?pProductCode=${selectedProductCode}&pClientCode=${selectedClientCode}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API de datos generales");
      }
      const result = await response.json();
      if (result.data) {
        setGeneralData(result.data);
      } else {
        setGeneralData(null);
      }
    } catch (error) {
      console.error("Error al buscar datos generales:", error);
      setGeneralData(null);
    } finally {
      setIsGeneralDataLoading(false);
    }
  }, [API_BASE_URL]);

  const fetchToolingData = useCallback(async (selectedClientCode: string, selectedProductCode: string) => {
    setIsToolingDataLoading(true);
    setToolingData(null);
    try {
      const apiUrl = `${API_BASE_URL}/api/productos/GetToolingData?pProductCode=${selectedProductCode}&pClientCode=${selectedClientCode}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API de herramental");
      }
      const result = await response.json();
      if (result.data) {
        setToolingData(result.data);
      } else {
        setToolingData(null);
      }
    } catch (error) {
      console.error("Error al buscar datos de herramental:", error);
      setToolingData(null);
    } finally {
      setIsToolingDataLoading(false);
    }
  }, [API_BASE_URL]);
  
  const fetchNoyeriaData = useCallback(async (selectedClientCode: string, selectedProductCode: string) => {
    setIsNoyeriaDataLoading(true);
    setNoyeriaData(null);
    try {
        const apiUrl = `${API_BASE_URL}/api/productos/GetNickelData?pProductCode=${selectedProductCode}&pClientCode=${selectedClientCode}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Error en la respuesta de la API de noyería");
        }
        const result = await response.json();
        if (result.data) {
            setNoyeriaData(result.data);
        } else {
            setNoyeriaData(null);
        }
    } catch (error) {
        console.error("Error al buscar datos de noyería:", error);
        setNoyeriaData(null);
    } finally {
        setIsNoyeriaDataLoading(false);
    }
  }, [API_BASE_URL]);

  const fetchMoldeoData = useCallback(async (selectedClientCode: string, selectedProductCode: string) => {
    setIsMoldeoDataLoading(true);
    setMoldeoData(null);
    try {
        const apiUrl = `${API_BASE_URL}/api/productos/GetMoldingData?pProductCode=${selectedProductCode}&pClientCode=${selectedClientCode}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Error en la respuesta de la API de moldeo");
        }
        const result = await response.json();
        if (result.data) {
            setMoldeoData(result.data);
        } else {
            setMoldeoData(null);
        }
    } catch (error) {
        console.error("Error al buscar datos de moldeo:", error);
        setMoldeoData(null);
    } finally {
        setIsMoldeoDataLoading(false);
    }
  }, [API_BASE_URL]);

  const fetchFusionData = useCallback(async (selectedClientCode: string, selectedProductCode: string) => {
    setIsFusionDataLoading(true);
    setFusionData(null);
    try {
        const apiUrl = `${API_BASE_URL}/api/productos/GetFusionData?pProductCode=${selectedProductCode}&pClientCode=${selectedClientCode}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Error en la respuesta de la API de fusión");
        }
        const result = await response.json();
        if (result.data) {
            setFusionData(result.data);
        } else {
            setFusionData(null);
        }
    } catch (error) {
        console.error("Error al buscar datos de fusión:", error);
        setFusionData(null);
    } finally {
        setIsFusionDataLoading(false);
    }
  }, [API_BASE_URL]);

    const fetchDeburredData = useCallback(async (selectedClientCode: string, selectedProductCode: string) => {
    setIsDeburredDataLoading(true);
    setDeburredData(null);
    try {
        const apiUrl = `${API_BASE_URL}/api/productos/GetDeburredData?pProductCode=${selectedProductCode}&pClientCode=${selectedClientCode}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Error en la respuesta de la API de rebabado");
        }
        const result = await response.json();
        if (result.data) {
            setDeburredData(result.data);
        } else {
            setDeburredData(null);
        }
    } catch (error) {
        console.error("Error al buscar datos de rebabado:", error);
        setDeburredData(null);
    } finally {
        setIsDeburredDataLoading(false);
    }
  }, [API_BASE_URL]);

  const fetchThermalData = useCallback(async (selectedClientCode: string, selectedProductCode: string) => {
    setIsThermalDataLoading(true);
    setThermalData(null);
    try {
      const apiUrl = `${API_BASE_URL}/api/productos/GetThermalData?pProductCode=${selectedProductCode}&pClientCode=${selectedClientCode}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API de tratamiento térmico");
      }
      const result = await response.json();
      if (result.data) {
        setThermalData(result.data);
      } else {
        setThermalData(null);
      }
    } catch (error) {
      console.error("Error al buscar datos de tratamiento térmico:", error);
      setThermalData(null);
    } finally {
      setIsThermalDataLoading(false);
    }
  }, [API_BASE_URL]);

  const fetchQualityData = useCallback(async (selectedProductCode: string) => {
    setIsQualityDataLoading(true);
    setQualityData(null);
    try {
      const apiUrl = `${API_BASE_URL}/api/productos/GetQualityData?pProductCode=${selectedProductCode}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API de calidad");
      }
      const result = await response.json();
      if (result.data) {
        setQualityData(result.data);
      } else {
        setQualityData(null);
      }
    } catch (error) {
      console.error("Error al buscar datos de calidad:", error);
      setQualityData(null);
    } finally {
      setIsQualityDataLoading(false);
    }
  }, [API_BASE_URL]);
  
  const fetchRecordData = useCallback(async (selectedProductCode: string) => {
    setIsRecordDataLoading(true);
    setRecordData(null);
    try {
      const apiUrl = `${API_BASE_URL}/api/productos/GetRecordData?pProductCode=${selectedProductCode}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la API de historial");
      }
      const result = await response.json();
      if (result.data) {
        setRecordData(result.data);
      } else {
        setRecordData(null);
      }
    } catch (error) {
      console.error("Error al buscar datos de historial:", error);
      setRecordData(null);
    } finally {
      setIsRecordDataLoading(false);
    }
  }, [API_BASE_URL]);


  const handleClientCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setClientCode(code);
    setSelectedClientName("");
    setClientName("");
    if (!code) {
      resetAllData();
    }
  };

  const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setClientName(name);
    setSelectedClientName(""); 
    setClientCode("");
    if (!name) {
      resetAllData();
    }
  };

  const handleSelectClient = (client: Client) => {
    setClientCode(client.codigo);
    setClientName(client.nombre); 
    setSelectedClientName(client.nombre); 
    setClientSearchResults([]);
    if (productCode) {
        fetchAllData(client.codigo, productCode);
    }
  }

  const handleProductCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setProductCode(code);
    setSelectedProductName(""); 
    setProductName("");
    if(!code){
      resetAllData();
    }
  };

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setProductName(name);
    setSelectedProductName(""); 
    setProductCode("");
    if(!name){
      resetAllData();
    }
  };

  const handleSelectProduct = (product: Product) => {
    setProductCode(product.codigo);
    setProductName(product.nombre);
    setSelectedProductName(product.nombre);
    setProductSearchResults([]);
    if (clientCode) {
        fetchAllData(clientCode, product.codigo);
    }
  }

  const fetchAllData = (clientCode: string, productCode: string) => {
    fetchGeneralData(clientCode, productCode);
    fetchToolingData(clientCode, productCode);
    fetchNoyeriaData(clientCode, productCode);
    fetchMoldeoData(clientCode, productCode);
    fetchFusionData(clientCode, productCode);
    fetchDeburredData(clientCode, productCode);
    fetchThermalData(clientCode, productCode);
    fetchQualityData(productCode);
    fetchRecordData(productCode);
  }
  
  const resetAllData = () => {
    setGeneralData(null);
    setToolingData(null);
    setNoyeriaData(null);
    setMoldeoData(null);
    setFusionData(null);
    setDeburredData(null);
    setThermalData(null);
    setQualityData(null);
    setRecordData(null);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="p-4 border-b">
        <div className="space-y-4">
          <div className="grid grid-cols-[max-content_1fr] items-center gap-4 relative">
            <Label htmlFor="client-code" className="text-right w-[8ch]">Cliente:</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  id="client-code"
                  type="text"
                  value={clientCode}
                  onChange={handleClientCodeChange}
                  placeholder="Código..."
                  className="w-full pr-8"
                  autoComplete="off"
                />
                {clientCode && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => {
                      setClientCode("");
                      setClientName("");
                      setSelectedClientName("");
                      setClientSearchResults([]);
                      resetAllData();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="relative">
                <Input
                  id="client-name"
                  type="text"
                  placeholder="Nombre del cliente"
                  value={clientName}
                  onChange={handleClientNameChange}
                  className="w-full bg-card pr-8"
                  autoComplete="off"
                />
                {clientName && (
                   <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => {
                      setClientCode("");
                      setClientName("");
                      setSelectedClientName("");
                      setClientSearchResults([]);
                      resetAllData();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            {isClientSearchLoading && <div className="absolute top-full left-[calc(8ch_+_1rem)] mt-1 p-2 bg-card border rounded-md shadow-lg z-10 w-[calc(100%_-_(8ch_+_1rem))]">Buscando...</div>}
            {clientSearchResults.length > 0 && !selectedClientName && (
              <ul className="absolute top-full left-[calc(8ch_+_1rem)] mt-1 bg-card border rounded-md shadow-lg z-10 w-[calc(100%_-_(8ch_+_1rem))]">
                {clientSearchResults.map((client) => (
                  <li 
                    key={client.codigo}
                    className="p-2 hover:bg-accent cursor-pointer"
                    onClick={() => handleSelectClient(client)}
                  >
                    {client.codigo} - {client.nombre}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="grid grid-cols-[max-content_1fr] items-center gap-4 relative">
            <Label htmlFor="product-code" className="text-right w-[8ch]">Producto:</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  id="product-code"
                  type="text"
                  value={productCode}
                  onChange={handleProductCodeChange}
                  placeholder="Código..."
                  className="w-full pr-8"
                  autoComplete="off"
                />
                {productCode && (
                   <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => {
                      setProductCode("");
                      setProductName("");
                      setSelectedProductName("");
                      setProductSearchResults([]);
                      resetAllData();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div className="relative">
                <Input
                  id="product-name"
                  type="text"
                  placeholder="Nombre del producto"
                  value={productName}
                  onChange={handleProductNameChange}
                  className="w-full bg-card pr-8"
                  autoComplete="off"
                />
                {productName && (
                   <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => {
                      setProductCode("");
                      setProductName("");
                      setSelectedProductName("");
                      setProductSearchResults([]);
                      resetAllData();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            {isProductSearchLoading && <div className="absolute top-full left-[calc(8ch_+_1rem)] mt-1 p-2 bg-card border rounded-md shadow-lg z-10 w-[calc(100%_-_(8ch_+_1rem))]">Buscando...</div>}
            {productSearchResults.length > 0 && !selectedProductName && (
                <ul className="absolute top-full left-[calc(8ch_+_1rem)] mt-1 bg-card border rounded-md shadow-lg z-10 w-[calc(100%_-_(8ch_+_1rem))]">
                {productSearchResults.map((product) => (
                  <li 
                    key={product.codigo}
                    className="p-2 hover:bg-accent cursor-pointer"
                    onClick={() => handleSelectProduct(product)}
                  >
                    {product.codigo} - {product.nombre}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 w-full flex-col">
        <Tabs defaultValue={tabNames[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-9 h-auto sm:h-14 rounded-none bg-muted p-1 sm:p-2">
            {tabNames.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className={cn(
                  "text-xs sm:text-sm font-semibold rounded-md transition-all duration-300",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md",
                  "data-[state=inactive]:bg-transparent data-[state=inactive]:text-muted-foreground hover:bg-primary/20"
                )}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="General" className="mt-4 p-4 rounded-xl border bg-card shadow-sm">
            <div className="min-h-[calc(100vh-250px)]">
              {isGeneralDataLoading && <p>Cargando datos generales...</p>}
              {!isGeneralDataLoading && !generalData && clientCode && productCode && <p>No se encontraron datos generales para la selección.</p>}
              {(!clientCode || !productCode) && <p>Seleccione un cliente y un producto para ver los datos.</p>}
              
              {generalData && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-4">
                    {/* Columna Izquierda */}
                    <div className="lg:col-span-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="material-code" className="font-semibold w-32 text-right">Material:</Label>
                        <Input id="material-code" value={generalData.materialCode ?? ''} readOnly className="w-24 bg-card" />
                        <Input id="material-name" value={generalData.materialName ?? ''} readOnly className="flex-1 bg-card" />
                      </div>
                      <div className="flex items-center gap-2">
                          <Label htmlFor="quality-product" className="font-semibold w-32 text-right">Estado Producto:</Label>
                          <Input id="quality-product" value={generalData.qualityProductName ?? ''} readOnly className="flex-1 bg-card" />
                      </div>
                      <div className="flex items-center gap-2">
                          <Label htmlFor="plane-number" className="font-semibold w-32 text-right">Nro. Plano:</Label>
                          <Input id="plane-number" value={generalData.planeNumber ?? ''} readOnly className="flex-1 bg-card" />
                      </div>
                      <div className="flex items-center gap-2">
                          <Label htmlFor="alternative-product" className="font-semibold w-32 text-right">Cod. Alternativo:</Label>
                          <Input id="alternative-product" value={generalData.alternativeProductCode ?? ''} readOnly className="flex-1 bg-card" />
                      </div>
                      <div className="flex items-center gap-2">
                          <Label htmlFor="gross-weight" className="font-semibold w-32 text-right">Peso Bruto:</Label>
                          <Input id="gross-weight" value={`${(generalData.grossWeight ?? 0).toFixed(2)}`} readOnly className="flex-1 bg-card" />
                      </div>
                      <div className="flex items-center gap-2">
                          <Label htmlFor="net-weight" className="font-semibold w-32 text-right">Peso Neto:</Label>
                          <Input id="net-weight" value={`${(generalData.netWeight ?? 0).toFixed(2)}`} readOnly className="flex-1 bg-card" />
                      </div>
                      <div className="flex items-center gap-2">
                          <Label htmlFor="weight-type" className="font-semibold w-32 text-right">Tipo Peso:</Label>
                          <Input id="weight-type" value={generalData.weightType ?? ''} readOnly className="flex-1 bg-card" />
                      </div>
                      <div className="flex items-center gap-2">
                          <Label htmlFor="pieces-mold" className="font-semibold w-32 text-right">Piezas x Molde:</Label>
                          <Input id="pieces-mold" value={generalData.piecesMold ?? ''} readOnly className="flex-1 bg-card" />
                      </div>
                      <div className="flex items-center gap-2">
                          <Label htmlFor="performance" className="font-semibold w-32 text-right">Rendimiento M-M:</Label>
                          <Input id="performance" value={`${(generalData.performance ?? 0).toFixed(2)} %`} readOnly className="flex-1 bg-card font-bold" />
                      </div>
                      <div className="flex items-center gap-2">
                          <Label htmlFor="stock" className="font-semibold w-32 text-right">Stock:</Label>
                          <Input id="stock" value={(generalData.stock ?? 0).toFixed(2)} readOnly className="flex-1 bg-card font-bold" />
                      </div>
                      <div className="flex items-center gap-2">
                          <Label className="font-semibold w-32 text-right">Entrega Mecanizada?:</Label>
                          <Checkbox id="mechanized-delivery" checked={generalData.mechanizedDelivery === 'S'} disabled />
                           <Label htmlFor="who-mechanizes" className="font-semibold text-right">Quién Mecaniza?:</Label>
                          <Input id="who-mechanizes" value={generalData.whoMechanizes ?? ''} readOnly className="flex-1 bg-card" />
                      </div>
                       <div className="flex items-center gap-2">
                          <Label htmlFor="third-costs" className="font-semibold w-32 text-right">Costos de 3ros ($):</Label>
                          <Input id="third-costs" value={(generalData.thirdCosts ?? '').toString()} readOnly className="w-24 bg-card" />
                          <Label htmlFor="third-times" className="font-semibold text-right">Tiempos de 3ros (días):</Label>
                          <Input id="third-times" value={(generalData.thirdTimes ?? '').toString()} readOnly className="flex-1 bg-card" />
                      </div>
                    </div>

                    {/* Columna Derecha */}
                    <div className="lg:col-span-1 space-y-4">
                       <Card className="p-2">
                        <CardContent className="space-y-2 pt-2">
                          <p className="font-semibold text-center text-sm">Datos de Calidad</p>
                           <div className="flex items-center justify-center gap-4">
                              <div className="flex items-center gap-2">
                                <Checkbox id="physical-certificate" checked={generalData.physicalCertificate} disabled />
                                <Label htmlFor="physical-certificate">Cert. Físico</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox id="chemical-certificate" checked={generalData.chemicalCertificate} disabled />
                                <Label htmlFor="chemical-certificate">Cert. Químico</Label>
                              </div>
                           </div>
                         </CardContent>
                       </Card>

                       <Card className="p-2">
                        <CardContent className="space-y-2 pt-2">
                           <p className="font-semibold text-center text-sm">Datos de Auditoría</p>
                           <div className="flex items-center gap-2 text-sm">
                              <Label htmlFor="create-date" className="font-semibold w-28 text-right">Fecha Alta:</Label>
                              <Input id="create-date" value={generalData.createDate ?? ''} readOnly className="flex-1 bg-card h-8" />
                           </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Label htmlFor="modified-date" className="font-semibold w-28 text-right">Fecha Modif.:</Label>
                              <Input id="modified-date" value={generalData.modifiedDate ?? ''} readOnly className="flex-1 bg-card h-8" />
                           </div>
                           <div className="flex items-center gap-2 text-sm">
                              <Label htmlFor="revision" className="font-semibold w-28 text-right">Nro Revisión:</Label>
                              <Input id="revision" value={generalData.revision ?? ''} readOnly className="flex-1 bg-card h-8" />
                           </div>
                           <div className="flex items-center gap-2 text-sm">
                              <Label htmlFor="technical-sheet-status" className="font-semibold w-28 text-right">Estado Ingeniería:</Label>
                              <Input id="technical-sheet-status" value={generalData.technicalSheetStatus ?? ''} readOnly className="flex-1 bg-card h-8" />
                           </div>
                           <div className="flex items-center gap-2 text-sm">
                              <Label htmlFor="modified-user" className="font-semibold w-28 text-right">Usuario Modificó:</Label>
                              <Input id="modified-user" value={generalData.modifiedUser ?? ''} readOnly className="flex-1 bg-card h-8" />
                           </div>
                         </CardContent>
                       </Card>

                      <div className="grid grid-cols-2 gap-2">
                         <div className="relative aspect-square">
                           {generalData.imageOne && generalData.imageOne !== 'System.Byte[]' ? (
                              <Image 
                                src={`data:image/png;base64,${generalData.imageOne}`} 
                                alt="Imagen 1 de pieza terminada" layout="fill" objectFit="cover" className="rounded-md" data-ai-hint="metal piece" />
                           ) : <Placeholder />}
                         </div>
                         <div className="relative aspect-square">
                           {generalData.imageTwo && generalData.imageTwo !== 'System.Byte[]' ? (
                              <Image 
                                src={`data:image/png;base64,${generalData.imageTwo}`} 
                                alt="Imagen 2 de pieza terminada" layout="fill" objectFit="cover" className="rounded-md" data-ai-hint="metal part" />
                           ) : <Placeholder />}
                         </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Observaciones Generales */}
                  <div className="space-y-1">
                    <Label htmlFor="general-remarks" className="font-semibold text-center block">Observaciones Generales de Pieza Terminada</Label>
                    <Textarea id="general-remarks" value={generalData.generalRemarks ?? ''} readOnly className="bg-card h-24" />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="Herramental" className="mt-4 p-4 rounded-xl border bg-card shadow-sm">
             <div className="min-h-[calc(100vh-250px)]">
              {isToolingDataLoading && <p>Cargando datos de herramental...</p>}
              {!isToolingDataLoading && !toolingData && clientCode && productCode && <p>No se encontraron datos de herramental para la selección.</p>}
              {(!clientCode || !productCode) && <p>Seleccione un cliente y un producto para ver los datos.</p>}

              {toolingData && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-5 items-center gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center gap-2 md:col-span-1">
                          <Checkbox id="tooling-traceability" checked={toolingData.traceability} disabled />
                          <Label htmlFor="tooling-traceability" className="font-semibold text-red-600">Lleva Trazabilidad</Label>
                      </div>
                      <div className="flex items-center gap-2 md:col-span-1">
                          <Checkbox id="tooling-own-model" checked={toolingData.ownModel} disabled />
                          <Label htmlFor="tooling-own-model" className="font-semibold">Modelo Propio ?</Label>
                      </div>
                      <div className="flex items-center gap-2 md:col-span-1">
                          <Label htmlFor="tooling-pieces-mold" className="font-semibold">Piezas x Molde:</Label>
                          <Input id="tooling-pieces-mold" value={toolingData.piecesMold ?? ''} readOnly className="w-20 bg-card" />
                      </div>
                      <div className="flex items-center gap-2 md:col-span-1">
                          <Checkbox id="tooling-combined-model" checked={toolingData.combinedModel} disabled />
                          <Label htmlFor="tooling-combined-model" className="font-semibold">Modelo Combinado ?</Label>
                      </div>
                       <div className="flex items-center gap-2 md:col-span-1">
                          <Label htmlFor="tooling-replicas" className="font-semibold">Cant. Replicas:</Label>
                          <Input id="tooling-replicas" value={toolingData.numberOwnReplicas ?? ''} readOnly className="w-20 bg-card" />
                      </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mt-4">
                    {/* Columna Izquierda */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="tooling-factory-model" className="font-semibold w-32 text-right">Modelo en Fabrica:</Label>
                            <Input id="tooling-factory-model" value={toolingData.factoryModel ?? ''} readOnly className="flex-1 bg-card" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="tooling-create-date" className="font-semibold w-32 text-right">F. Ingreso Modelo:</Label>
                            <Input id="tooling-create-date" value={toolingData.modelCreateDate ?? ''} readOnly className="flex-1 bg-card" />
                        </div>
                        <div className="flex items-center gap-2">
                           <Label htmlFor="tooling-modified-date" className="font-semibold w-32 text-right">F. Egreso Modelo:</Label>
                           <Input id="tooling-modified-date" value={toolingData.modelModifiedDate ?? ''} readOnly className="flex-1 bg-card" />
                        </div>
                    </div>
                     {/* Columna Derecha */}
                    <div className="space-y-2">
                       <div className="flex items-center gap-2">
                            <Label htmlFor="tooling-location" className="font-semibold w-24 text-right">Ubicación:</Label>
                            <Input id="tooling-location" value={toolingData.locationName ?? ''} readOnly className="flex-1 bg-card" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Label htmlFor="tooling-model-type" className="font-semibold w-24 text-right">Tipo Modelo:</Label>
                            <Input id="tooling-model-type" value={toolingData.modelTypeName ?? ''} readOnly className="flex-1 bg-card" />
                        </div>
                         <div className="flex items-center gap-2">
                           <Label htmlFor="tooling-origin" className="font-semibold w-24 text-right">Origen:</Label>
                           <Input id="tooling-origin" value={toolingData.modelOrigin ?? ''} readOnly className="flex-1 bg-card h-8" />
                        </div>
                        <div className="flex items-center gap-2">
                           <Label htmlFor="tooling-destiny" className="font-semibold w-24 text-right">Destino:</Label>
                            <Input id="tooling-destiny" value={toolingData.modelDestiny ?? ''} readOnly className="flex-1 bg-card h-8" />
                        </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4">
                      <div className="relative aspect-square">
                          {toolingData.imageOne && toolingData.imageOne !== 'System.Byte[]' ? (
                            <Image 
                              src={`data:image/png;base64,${toolingData.imageOne}`} 
                              alt="Herramental Imagen 1" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="tooling machine" />
                          ) : <Placeholder />}
                      </div>
                      <div className="relative aspect-square">
                          {toolingData.imageTwo && toolingData.imageTwo !== 'System.Byte[]' ? (
                            <Image 
                              src={`data:image/png;base64,${toolingData.imageTwo}`} 
                              alt="Herramental Imagen 2" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="tooling part" />
                          ) : <Placeholder />}
                      </div>
                      <div className="relative aspect-square">
                          {toolingData.imageThree && toolingData.imageThree !== 'System.Byte[]' ? (
                            <Image 
                              src={`data:image/png;base64,${toolingData.imageThree}`} 
                              alt="Herramental Imagen 3" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="industrial machine" />
                          ) : <Placeholder />}
                      </div>
                      <div className="relative aspect-square">
                          {toolingData.imageFour && toolingData.imageFour !== 'System.Byte[]' ? (
                            <Image 
                              src={`data:image/png;base64,${toolingData.imageFour}`} 
                              alt="Herramental Imagen 4" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="industrial part" />
                          ) : <Placeholder />}
                      </div>
                  </div>

                  <div className="space-y-1 pt-4">
                      <Label htmlFor="tooling-observation" className="font-semibold text-center block">Observaciones del Herramental</Label>
                      <Textarea id="tooling-observation" value={toolingData.observation ?? ''} readOnly className="bg-card h-24" />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="Noyería" className="mt-4 p-4 rounded-xl border bg-card shadow-sm">
             <div className="min-h-[calc(100vh-250px)]">
                {isNoyeriaDataLoading && <p>Cargando datos de noyería...</p>}
                {!isNoyeriaDataLoading && !noyeriaData && clientCode && productCode && <p>No se encontraron datos de noyería para la selección.</p>}
                {(!clientCode || !productCode) && <p>Seleccione un cliente y un producto para ver los datos.</p>}

                {noyeriaData && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Checkbox id="noyeria-take" checked={noyeriaData.nickelTake} disabled />
                            <Label htmlFor="noyeria-take" className="font-semibold text-red-600">Lleva Noyo?</Label>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
                            {/* Columna Izquierda */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="noyeria-quantity" className="font-semibold w-40 text-right">Total de Noyos:</Label>
                                    <Input id="noyeria-quantity" value={noyeriaData.nickelQuantity ?? ''} readOnly className="flex-1 bg-card" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="noyeria-hollow" className="font-semibold w-40 text-right">Total Noyos Ahuecado:</Label>
                                    <Input id="noyeria-hollow" value={noyeriaData.nickelHollow ?? ''} readOnly className="flex-1 bg-card" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="noyeria-armor" className="font-semibold w-40 text-right">Total Noyos con Armadura:</Label>
                                    <Input id="noyeria-armor" value={noyeriaData.nickelArmor ?? ''} readOnly className="flex-1 bg-card" />
                                </div>
                            </div>
                            {/* Columna Derecha */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="noyeria-type" className="font-semibold w-40 text-right">Tipo de Noyo (Principal):</Label>
                                    <Input id="noyeria-type" value={noyeriaData.nickelType ?? ''} readOnly className="flex-1 bg-card" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="noyeria-paint" className="font-semibold w-40 text-right">Pintura Sugerida:</Label>
                                    <Input id="noyeria-paint" value={noyeriaData.paintType ?? ''} readOnly className="flex-1 bg-card" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="noyeria-weight" className="font-semibold w-40 text-right">Total Kg. Arena:</Label>
                                    <Input id="noyeria-weight" value={(noyeriaData.nickelWeight ?? 0).toFixed(2)} readOnly className="flex-1 bg-card font-bold" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-4">
                            <div className="relative aspect-square">
                                {noyeriaData.imageOne && noyeriaData.imageOne !== 'System.Byte[]' ? (
                                  <Image 
                                    src={`data:image/png;base64,${noyeriaData.imageOne}`} 
                                    alt="Noyería Imagen 1" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="industrial mold" />
                                ) : <Placeholder />}
                            </div>
                            <div className="relative aspect-square">
                                {noyeriaData.imageTwo && noyeriaData.imageTwo !== 'System.Byte[]' ? (
                                  <Image 
                                    src={`data:image/png;base64,${noyeriaData.imageTwo}`} 
                                    alt="Noyería Imagen 2" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="foundry core" />
                                ) : <Placeholder />}
                            </div>
                            <div className="relative aspect-square">
                                {noyeriaData.imageThree && noyeriaData.imageThree !== 'System.Byte[]' ? (
                                  <Image 
                                    src={`data:image/png;base64,${noyeriaData.imageThree}`} 
                                    alt="Noyería Imagen 3" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="sand core" />
                                ) : <Placeholder />}
                            </div>
                        </div>

                        {/* Observaciones */}
                        <div className="space-y-1 pt-4">
                            <Label htmlFor="noyeria-observation" className="font-semibold text-center block">Observaciones de Noyería</Label>
                            <Textarea id="noyeria-observation" value={noyeriaData.observation ?? ''} readOnly className="bg-card h-24" />
                        </div>
                    </div>
                )}
             </div>
          </TabsContent>

          <TabsContent value="Moldeo" className="mt-4 p-4 rounded-xl border bg-card shadow-sm">
             <div className="min-h-[calc(100vh-250px)]">
                {isMoldeoDataLoading && <p>Cargando datos de moldeo...</p>}
                {!isMoldeoDataLoading && !moldeoData && clientCode && productCode && <p>No se encontraron datos de moldeo para la selección.</p>}
                {(!clientCode || !productCode) && <p>Seleccione un cliente y un producto para ver los datos.</p>}

                {moldeoData && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
                        {/* Columna Izquierda */}
                        <div className="space-y-4">
                            <Card>
                                <CardHeader className="flex flex-row justify-between items-start">
                                    <CardTitle className="text-base">Datos de la Caja</CardTitle>
                                    <div className="text-xs text-muted-foreground text-right">
                                        <p>PE Arena = 1,6</p>
                                        <p>PE Hierro = 7,86</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3 p-4">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-box-type" className="font-semibold w-28 text-right">Tipo de Caja:</Label>
                                        <Input id="moldeo-box-type" value={moldeoData.boxType ?? ''} readOnly className="flex-1 bg-card" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="font-semibold w-28 text-right">Sobre (en mm):</Label>
                                        <Input value={(moldeoData.boxTopOne ?? 0).toFixed(2)} readOnly className="flex-1 bg-card text-center" />
                                        <Input value={(moldeoData.boxTopTwo ?? 0).toFixed(2)} readOnly className="flex-1 bg-card text-center" />
                                        <Input value={(moldeoData.boxTopThree ?? 0).toFixed(2)} readOnly className="flex-1 bg-card text-center" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="font-semibold w-28 text-right">Bajo (en mm):</Label>
                                        <Input value={(moldeoData.boxBelowOne ?? 0).toFixed(2)} readOnly className="flex-1 bg-card text-center" />
                                        <Input value={(moldeoData.boxBelowTwo ?? 0).toFixed(2)} readOnly className="flex-1 bg-card text-center" />
                                        <Input value={(moldeoData.boxBelowThree ?? 0).toFixed(2)} readOnly className="flex-1 bg-card text-center" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-kg-sand" className="font-semibold w-28 text-right">Kg. de Arena:</Label>
                                        <Input id="moldeo-kg-sand" value={(moldeoData.kgSand ?? 0).toFixed(2)} readOnly className="flex-1 bg-card" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-kg-resin" className="font-semibold w-28 text-right">Kg. de Resina:</Label>
                                        <Input id="moldeo-kg-resin" value={(moldeoData.kgResin ?? 0).toFixed(2)} readOnly className="flex-1 bg-card" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-kg-catalyst" className="font-semibold w-28 text-right">Kg. de Catalizador:</Label>
                                        <Input id="moldeo-kg-catalyst" value={(moldeoData.kgCatalyst ?? 0).toFixed(2)} readOnly className="flex-1 bg-card" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-rma" className="font-semibold w-28 text-right">Rend. Metal - Arena:</Label>
                                        <Input id="moldeo-rma" value={(moldeoData.rma ?? 0).toFixed(2)} readOnly className="flex-1 bg-card" />
                                    </div>
                                     <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-rmm" className="font-semibold w-28 text-right">Rend. Metal - Molde:</Label>
                                        <Input id="moldeo-rmm" value={`${(moldeoData.rmm ?? 0).toFixed(2)} %`} readOnly className="flex-1 bg-card" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-cooler-quantity" className="font-semibold w-28 text-right">Enfriadores:</Label>
                                        <Input id="moldeo-cooler-quantity" value={moldeoData.coolerQuantity ?? ''} readOnly className="flex-1 bg-card" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-paint-type" className="font-semibold w-28 text-right">Tpo. Pintura Molde:</Label>
                                        <Input id="moldeo-paint-type" value={moldeoData.paintType ?? ''} readOnly className="flex-1 bg-card" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-area" className="font-semibold w-28 text-right">Area:</Label>
                                        <Input id="moldeo-area" value={moldeoData.area ?? ''} readOnly className="flex-1 bg-card" />
                                    </div>
                                     <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-time" className="font-semibold w-28 text-right">Tiempo Est. Moldeo:</Label>
                                        <Input id="moldeo-time" value={`${(moldeoData.moldingTime ?? 0).toFixed(2)} min.`} readOnly className="flex-1 bg-card font-bold" />
                                    </div>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader><CardTitle className="text-base">Sistema de Llenado</CardTitle></CardHeader>
                                <CardContent className="space-y-2 p-4">
                                     <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-fill-down" className="font-semibold w-32 text-right">Seccion Bajada:</Label>
                                        <Input id="moldeo-fill-down" value={moldeoData.fillDown ?? ''} readOnly className="flex-1 bg-card" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-fill-principal" className="font-semibold w-32 text-right">Seccion C. Principal:</Label>
                                        <Input id="moldeo-fill-principal" value={moldeoData.fillPrincipal ?? ''} readOnly className="flex-1 bg-card" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="moldeo-fill-attack" className="font-semibold w-32 text-right">Seccion Ataques:</Label>
                                        <Input id="moldeo-fill-attack" value={moldeoData.fillAttack ?? ''} readOnly className="flex-1 bg-card" />
                                    </div>
                                </CardContent>
                             </Card>
                        </div>

                        {/* Columna Derecha */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                                <div className="relative aspect-[3/4]">
                                    {moldeoData.imageOne && moldeoData.imageOne !== 'System.Byte[]' ? (
                                      <Image 
                                      src={`data:image/png;base64,${moldeoData.imageOne}`} 
                                      alt="Moldeo Imagen 1" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="molding process" />
                                    ) : <Placeholder />}
                                </div>
                                <div className="relative aspect-[3/4]">
                                    {moldeoData.imageTwo && moldeoData.imageTwo !== 'System.Byte[]' ? (
                                      <Image 
                                      src={`data:image/png;base64,${moldeoData.imageTwo}`} 
                                      alt="Moldeo Imagen 2" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="foundry mold" />
                                    ) : <Placeholder />}
                                </div>
                                <div className="relative aspect-[3/4]">
                                    {moldeoData.imageThree && moldeoData.imageThree !== 'System.Byte[]' ? (
                                      <Image 
                                      src={`data:image/png;base64,${moldeoData.imageThree}`} 
                                      alt="Moldeo Imagen 3" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="metal casting" />
                                    ) : <Placeholder />}
                                </div>
                            </div>
                             <div className="space-y-1">
                                <Label htmlFor="moldeo-observation" className="font-semibold text-center block">Observaciones de Moldeo</Label>
                                <Textarea id="moldeo-observation" value={moldeoData.observation ?? ''} readOnly className="bg-card h-64" />
                            </div>
                        </div>
                    </div>
                )}
             </div>
          </TabsContent>

          <TabsContent value="Fusión" className="mt-4 p-4 rounded-xl border bg-card shadow-sm">
             <div className="min-h-[calc(100vh-250px)]">
                {isFusionDataLoading && <p>Cargando datos de fusión...</p>}
                {!isFusionDataLoading && !fusionData && clientCode && productCode && <p>No se encontraron datos de fusión para la selección.</p>}
                {(!clientCode || !productCode) && <p>Seleccione un cliente y un producto para ver los datos.</p>}

                {fusionData && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 border p-4 rounded-lg">
                            <div className="flex items-center gap-2">
                                <Label htmlFor="fusion-temp" className="font-semibold text-right">Tº de Colado:</Label>
                                <Input id="fusion-temp" value={fusionData.filterTemperature ?? ''} readOnly className="flex-1 bg-card" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="fusion-fill-time" className="font-semibold text-right">Tiempo Llenado (seg):</Label>
                                <Input id="fusion-fill-time" value={(fusionData.filterFilled ?? 0).toFixed(2)} readOnly className="flex-1 bg-card" />
                            </div>
                             <div className="flex items-center gap-2">
                                <Label htmlFor="fusion-cool-time" className="font-semibold text-right">T. Enfriamiento (hs):</Label>
                                <Input id="fusion-cool-time" value={(fusionData.filterCooled ?? 0).toFixed(2)} readOnly className="flex-1 bg-card" />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="fusion-observation" className="font-semibold text-center block">Observaciones de Fusión</Label>
                            <Textarea id="fusion-observation" value={fusionData.observation ?? ''} readOnly className="bg-card h-48" />
                        </div>
                    </div>
                )}
             </div>
          </TabsContent>
          
          <TabsContent value="Rebabado" className="mt-4 p-4 rounded-xl border bg-card shadow-sm">
             <div className="min-h-[calc(100vh-250px)]">
                {isDeburredDataLoading && <p>Cargando datos de rebabado...</p>}
                {!isDeburredDataLoading && !deburredData && clientCode && productCode && <p>No se encontraron datos de rebabado para la selección.</p>}
                {(!clientCode || !productCode) && <p>Seleccione un cliente y un producto para ver los datos.</p>}

                {deburredData && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <div className="relative aspect-square">
                                {deburredData.imageOne && deburredData.imageOne !== 'System.Byte[]' ? (
                                  <Image 
                                    src={`data:image/png;base64,${deburredData.imageOne}`} 
                                    alt="Rebabado Imagen 1" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="deburring process" />
                                ) : <Placeholder />}
                            </div>
                            <div className="relative aspect-square">
                                {deburredData.imageTwo && deburredData.imageTwo !== 'System.Byte[]' ? (
                                  <Image 
                                    src={`data:image/png;base64,${deburredData.imageTwo}`} 
                                    alt="Rebabado Imagen 2" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="metal finishing" />
                                ) : <Placeholder />}
                            </div>
                            <div className="relative aspect-square">
                                {deburredData.imageThree && deburredData.imageThree !== 'System.Byte[]' ? (
                                  <Image 
                                    src={`data:image/png;base64,${deburredData.imageThree}`} 
                                    alt="Rebabado Imagen 3" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="industrial finishing" />
                                ) : <Placeholder />}
                            </div>
                             <div className="relative aspect-square">
                                {deburredData.imageFour && deburredData.imageFour !== 'System.Byte[]' ? (
                                  <Image 
                                    src={`data:image/png;base64,${deburredData.imageFour}`} 
                                    alt="Rebabado Imagen 4" layout="fill" objectFit="contain" className="rounded-md" data-ai-hint="metal parts" />
                                ) : <Placeholder />}
                            </div>
                        </div>
                        <div className="space-y-2 pt-4">
                            <Label htmlFor="deburred-observation" className="font-semibold text-center block">Observaciones de Rebabado</Label>
                            <Textarea id="deburred-observation" value={deburredData.observation ?? ''} readOnly className="bg-card h-48" />
                        </div>
                    </div>
                )}
             </div>
          </TabsContent>

          <TabsContent value="Térmico" className="mt-4 p-4 rounded-xl border bg-card shadow-sm">
             <div className="min-h-[calc(100vh-250px)]">
                {isThermalDataLoading && <p>Cargando datos de tratamiento térmico...</p>}
                {!isThermalDataLoading && !thermalData && clientCode && productCode && <p>No se encontraron datos de tratamiento térmico para la selección.</p>}
                {(!clientCode || !productCode) && <p>Seleccione un cliente y un producto para ver los datos.</p>}

                {thermalData && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border p-4 rounded-lg">
                            <div className="flex items-center gap-2 col-span-1 md:col-span-2 lg:col-span-1">
                                <Label htmlFor="thermal-type" className="font-semibold w-40 text-right">Tipo Tratamiento:</Label>
                                <Input id="thermal-type" value={thermalData.thermalTreatmentType ?? ''} readOnly className="flex-1 bg-card" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="thermal-temp" className="font-semibold w-40 text-right">Temperatura (°C):</Label>
                                <Input id="thermal-temp" value={`${thermalData.residenceTemperature ?? ''} ºC`} readOnly className="flex-1 bg-card" />
                            </div>
                             <div className="flex items-center gap-2">
                                <Label htmlFor="thermal-time" className="font-semibold w-40 text-right">Tiempo de Permanencia (hs):</Label>
                                <Input id="thermal-time" value={`${(thermalData.residenceTime ?? 0).toFixed(2)} Hs.`} readOnly className="flex-1 bg-card" />
                            </div>
                            <div className="flex items-center gap-2 col-span-1 md:col-span-2 lg:col-span-1">
                                <Label htmlFor="thermal-cooling" className="font-semibold w-40 text-right">Medio Enfriamiento:</Label>
                                <Input id="thermal-cooling" value={thermalData.coolingMedium ?? ''} readOnly className="flex-1 bg-card" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="thermal-hardness" className="font-semibold w-40 text-right">Dureza (en Brinell):</Label>
                                <Input id="thermal-hardness" value={thermalData.hardness ?? ''} readOnly className="flex-1 bg-card font-bold" />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="thermal-observation" className="font-semibold text-center block">Observaciones de Tratamiento Térmico</Label>
                            <Textarea id="thermal-observation" value={thermalData.observation ?? ''} readOnly className="bg-card h-48" />
                        </div>
                    </div>
                )}
             </div>
          </TabsContent>

          <TabsContent value="Calidad" className="mt-4 p-4 rounded-xl border bg-card shadow-sm">
            <div className="min-h-[calc(100vh-250px)]">
              {isQualityDataLoading && <p>Cargando datos de calidad...</p>}
              {!isQualityDataLoading && !qualityData && productCode && <p>No se encontraron datos de calidad para la selección.</p>}
              {!productCode && <p>Seleccione un producto para ver los datos.</p>}

              {qualityData && (
                <div className="grid grid-rows-2 gap-4 h-[calc(100vh-280px)]">
                  {/* Sección Superior */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      {qualityData.imageOne && qualityData.imageOne !== 'System.Byte[]' ? (
                        <Image 
                          src={`data:image/png;base64,${qualityData.imageOne}`} 
                          alt="Calidad Imagen 1" 
                          layout="fill" 
                          objectFit="contain" 
                          className="rounded-md p-2 border"
                          data-ai-hint="quality control"
                        />
                      ) : <Placeholder />}
                    </div>
                    <div className="flex flex-col">
                      <Label htmlFor="quality-observation-one" className="font-semibold mb-2 text-center">Observaciones Plano de Control</Label>
                      <Textarea 
                        id="quality-observation-one" 
                        value={qualityData.observationOne ?? ''} 
                        readOnly 
                        className="bg-card flex-grow" 
                      />
                    </div>
                  </div>
                  
                  {/* Sección Inferior */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                       {qualityData.imageTwo && qualityData.imageTwo !== 'System.Byte[]' ? (
                         <Image 
                          src={`data:image/png;base64,${qualityData.imageTwo}`} 
                          alt="Calidad Imagen 2" 
                          layout="fill" 
                          objectFit="contain" 
                          className="rounded-md p-2 border"
                          data-ai-hint="quality inspection"
                        />
                       ) : <Placeholder />}
                    </div>
                     <div className="flex flex-col">
                      <Label htmlFor="quality-observation-two" className="font-semibold mb-2 text-center">Observaciones Puntos Críticos</Label>
                      <Textarea 
                        id="quality-observation-two" 
                        value={qualityData.observationTwo ?? ''} 
                        readOnly 
                        className="bg-card flex-grow" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="Historial" className="mt-4 p-4 rounded-xl border bg-card shadow-sm">
            <div className="min-h-[calc(100vh-250px)]">
                {isRecordDataLoading && <p>Cargando datos del historial...</p>}
                {!isRecordDataLoading && !recordData && productCode && <p>No se encontraron datos de historial para la selección.</p>}
                {!productCode && <p>Seleccione un producto para ver los datos.</p>}

                {recordData && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader><CardTitle className="text-sm font-semibold">Ultimo OC del Cliente</CardTitle></CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Nro Pedido:</Label>
                                        <Input value={recordData.lastOrderNumber ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Nro OC:</Label>
                                        <Input value={recordData.lastExternalOrderNumber ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Fecha OC:</Label>
                                        <Input value={recordData.lastOrderDate ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Cant. Pedida OC:</Label>
                                        <Input value={recordData.lastQuantityOrder ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader><CardTitle className="text-sm font-semibold">Ultimo OF</CardTitle></CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Ultima OF:</Label>
                                        <Input value={recordData.lastManufacturingOrderNumber ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Fecha OF:</Label>
                                        <Input value={recordData.lastManufacturingOrderDate ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Cant. Programada:</Label>
                                        <Input value={recordData.lastQuantityManufacturingOrder ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-sm font-semibold">Ultimo Parte de Produccion</CardTitle></CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Nro Pedido:</Label>
                                        <Input value={recordData.lastOrderNumber ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Fecha Produccion:</Label>
                                        <Input value={recordData.lastProductionDate ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Cant. Producida - Stock Asig.:</Label>
                                        <Input value={recordData.lastQuantityProduced ?? ''} readOnly className="flex-1 bg-card h-8" />
                                        <Input value={recordData.lastAssignedStock ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle className="text-sm font-semibold">Ultimo Parte de Entrega</CardTitle></CardHeader>
                                <CardContent className="space-y-2 text-sm">
                                     <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Nro Pedido:</Label>
                                        <Input value={recordData.lastOrderNumber ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Fecha Entrega:</Label>
                                        <Input value={recordData.lastDateDelivered ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Label className="w-32 text-right">Cant. Entregada:</Label>
                                        <Input value={recordData.lastQuantityDelivered ?? ''} readOnly className="flex-1 bg-card h-8" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className="lg:col-span-2">
                             <CardHeader><CardTitle className="text-sm font-semibold">Resumen</CardTitle></CardHeader>
                             <CardContent className="space-y-1 text-sm">
                                 <div className="grid grid-cols-4 gap-2 font-semibold text-center border-b pb-1">
                                    <div></div>
                                    <div>Unidad</div>
                                    <div>Kg</div>
                                    <div></div>
                                 </div>
                                 {/* Fila de la tabla */}
                                 <div className="grid grid-cols-4 items-center gap-2">
                                    <Label className="text-right">Pedido:</Label>
                                    <Input value={(recordData.order ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <Input value={(recordData.kgOrder ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <div/>
                                 </div>
                                 <div className="grid grid-cols-4 items-center gap-2">
                                    <Label className="text-right">Producido:</Label>
                                    <Input value={(recordData.produced ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <Input value={(recordData.kgProduced ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                     <div/>
                                 </div>
                                 <div className="grid grid-cols-4 items-center gap-2">
                                    <Label className="text-right">Scrap Interno:</Label>
                                    <Input value={(recordData.internalScrap ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <Input value={(recordData.kgInternalScrap ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <Input value={`${(recordData.percentageKgInternalScrap ?? 0).toFixed(2)}%`} readOnly className="bg-card h-8 text-right" />
                                 </div>
                                 <div className="grid grid-cols-4 items-center gap-2">
                                    <Label className="text-right">Scrap Externo:</Label>
                                    <Input value={(recordData.externalScrap ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <Input value={(recordData.kgExternalScrap ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <Input value={`${(recordData.percentageKgExternalScrap ?? 0).toFixed(2)}%`} readOnly className="bg-card h-8 text-right" />
                                 </div>
                                 <div className="grid grid-cols-4 items-center gap-2">
                                    <Label className="text-right">Total Scrap:</Label>
                                    <Input value={(recordData.totalScrap ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right font-bold" />
                                    <Input value={(recordData.kgTotalScrap ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right font-bold" />
                                    <Input value={`${(recordData.percentageKgTotalScrap ?? 0).toFixed(2)}%`} readOnly className="bg-card h-8 text-right font-bold" />
                                 </div>
                                 <div className="grid grid-cols-4 items-center gap-2">
                                    <Label className="text-right">Reparaciones:</Label>
                                    <Input value={(recordData.repairs ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <Input value={(recordData.kgRepairs ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <Input value={`${(recordData.percentageKgRepairs ?? 0).toFixed(2)}%`} readOnly className="bg-card h-8 text-right" />
                                 </div>
                                 <div className="grid grid-cols-4 items-center gap-2">
                                    <Label className="text-right">Entregado:</Label>
                                    <Input value={(recordData.delivered ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right font-bold" />
                                    <Input value={(recordData.kgDelivered ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right font-bold" />
                                    <Input value={`${(recordData.percentageKgDelivered ?? 0).toFixed(2)}%`} readOnly className="bg-card h-8 text-right font-bold" />
                                 </div>
                                 <div className="grid grid-cols-4 items-center gap-2">
                                    <Label className="text-right">Diferencia (Prod - Ent - Scrap):</Label>
                                    <Input value={(recordData.difference ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <Input value={(recordData.kgDifference ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right" />
                                    <Input value={`${(recordData.percentageKgDifference ?? 0).toFixed(2)}%`} readOnly className="bg-card h-8 text-right" />
                                 </div>
                                 <div className="grid grid-cols-4 items-center gap-2 pt-2">
                                    <div className="col-span-2"></div>
                                    <Label className="text-right">Dias Prom. Atraso:</Label>
                                    <Input value={(recordData.averageDaysLate ?? 0).toFixed(2)} readOnly className="bg-card h-8 text-right font-bold" />
                                 </div>
                             </CardContent>
                        </Card>
                    </div>
                )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="py-4 text-center w-full">
        <p className="text-xs text-muted-foreground">Optimized for horizontal mobile view</p>
      </footer>
    </div>
  );
}

    