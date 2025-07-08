import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export interface PredictionData {
  state: string;
  prediction: number;
  cases_new_per100k_7d_avg: number | null;
  date: string | null;
  time_idx: number | null;
  id?: string; 
}

export const usePredictionData = () => {
  return useQuery({
    queryKey: ['predictions'],
    queryFn: async () => {
      // Fetch all predictions from the correct collection
      const q = query(
        collection(db, 'prediction_full_train'),
        orderBy('prediction', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ ...(doc.data() as PredictionData), id: doc.id }));
      return data;
    },
  });
};

export const usePredictionsByState = (stateName: string | null) => {
  return useQuery({
    queryKey: ['predictions', stateName],
    queryFn: async () => {
      if (!stateName) return [];
      // Fetch all documents for a state by filtering document IDs
      const q = query(
        collection(db, 'prediction_full_train')
      );
      const querySnapshot = await getDocs(q);
      // Filter docs whose ID starts with the state name
      const data = querySnapshot.docs
        .filter(doc => doc.id.startsWith(stateName + '_'))
        .map(doc => {
          const d = doc.data() as PredictionData;
          return {
            ...d,
            id: doc.id,
            date: d.date && (d.date as any).toDate ? (d.date as any).toDate().toISOString() : d.date,
          };
        });
      // Sort by date ascending if date exists
      data.sort((a, b) => (a.date || '').localeCompare(b.date || ''));
      return data;
    },
    enabled: !!stateName,
  });
};
