import { createContext, useContext } from 'react';
import type { Dependencies } from '../../infrastructure/composition/create-dependencies';

const DependenciesContext = createContext<Dependencies | null>(null);

export const DependenciesProvider = DependenciesContext.Provider;

export function useDependencies(): Dependencies {
  const value = useContext(DependenciesContext);
  if (!value) {
    throw new Error('DependenciesProvider is required');
  }

  return value;
}
