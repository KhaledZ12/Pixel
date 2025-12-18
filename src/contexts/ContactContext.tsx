import { createContext, useState, useEffect, ReactNode } from 'react';
import { getContactContent } from '@/services/adminService';
import { ContactPageContent } from '@/types/admin';

interface ContactContextType {
  contactInfo: ContactPageContent | null;
  loading: boolean;
  error: string | null;
  refreshContact: () => Promise<void>;
}

export const ContactContext = createContext<ContactContextType | undefined>(undefined);

interface ContactProviderProps {
  children: ReactNode;
}

export const ContactProvider: React.FC<ContactProviderProps> = ({ children }) => {
  const [contactInfo, setContactInfo] = useState<ContactPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshContact = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContactContent();
      setContactInfo(data);
    } catch (err) {
      setError('فشل تحميل معلومات التواصل');
      console.error('Error loading contact info:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshContact();
  }, []);

  useEffect(() => {
    const handleContactUpdate = () => {
      refreshContact();
    };

    window.addEventListener('contactInfoUpdated', handleContactUpdate);
    return () => {
      window.removeEventListener('contactInfoUpdated', handleContactUpdate);
    };
  }, []);

  return (
    <ContactContext.Provider value={{ contactInfo, loading, error, refreshContact }}>
      {children}
    </ContactContext.Provider>
  );
};
