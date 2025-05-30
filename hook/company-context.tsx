"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/api";

interface CompanyContextType {
  companyData: any[];
  loading: boolean;
  fetchCompanyData: () => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType>({
  companyData: [],
  loading: false,
  fetchCompanyData: async () => {},
});

export const CompanyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCompanyData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/customer`);
      setCompanyData(response.data.data);
    } catch (error) {
      console.error("Error fetching company data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CompanyContext.Provider value={{ companyData, loading, fetchCompanyData }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);
