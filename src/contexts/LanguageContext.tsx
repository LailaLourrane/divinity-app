import { createContext, useState, useContext } from 'react';

const dictionary = {
  'pt-BR': {
    settingsTitle: 'Configurações', changeLang: 'Mudar idioma', deleteProg: 'Apagar Progresso', currentLang: 'Português (BR)',
    homeTitle: 'Início', searchRecipe: 'Buscar receita...', advancedFilters: 'Filtros Avançados', recentCrafts: 'Criações Recentes',
    inventoryTitle: 'Inventário', searchIngredient: 'Buscar ingrediente...', tabOwned: 'Na Mochila', tabMissing: 'Faltando', noItems: 'Nenhum item encontrado aqui.',
    craftingTitle: 'Criação', inBag: 'Na Mochila', missing: 'Falta',
    favoritesTitle: 'Favoritos', filterModalTitle: 'Filtros de Criação',
    filterAll: 'Todos', filterFoods: 'Comidas', filterPotions: 'Poções', filterRunes: 'Runas', filterArrows: 'Flechas', filterGrenades: 'Granadas', filterScrolls: 'Pergaminhos'
  },
  en: {
    settingsTitle: 'Settings', changeLang: 'Change language', deleteProg: 'Delete Progress', currentLang: 'English',
    homeTitle: 'Home', searchRecipe: 'Search recipe...', advancedFilters: 'Advanced Filters', recentCrafts: 'Recent Crafts',
    inventoryTitle: 'Inventory', searchIngredient: 'Search for ingredient...', tabOwned: 'Owned', tabMissing: 'Missing', noItems: 'No items found here.',
    craftingTitle: 'Crafting', inBag: 'In Bag', missing: 'Missing',
    favoritesTitle: 'Favorites', filterModalTitle: 'Craftings',
    filterAll: 'All', filterFoods: 'Foods', filterPotions: 'Potions', filterRunes: 'Runes', filterArrows: 'Arrows', filterGrenades: 'Grenades', filterScrolls: 'Scrolls'
  },
  'es-AR': {
    settingsTitle: 'Configuración', changeLang: 'Cambiar idioma', deleteProg: 'Borrar progreso', currentLang: 'Español (AR)',
    homeTitle: 'Inicio', searchRecipe: 'Buscar receta...', advancedFilters: 'Filtros Avanzados', recentCrafts: 'Creaciones Recientes',
    inventoryTitle: 'Inventario', searchIngredient: 'Buscar ingrediente...', tabOwned: 'Obtenido', tabMissing: 'Faltante', noItems: 'No hay items aquí.',
    craftingTitle: 'Creación', inBag: 'En Bolso', missing: 'Falta',
    favoritesTitle: 'Favoritos', filterModalTitle: 'Creaciones',
    filterAll: 'Todos', filterFoods: 'Comidas', filterPotions: 'Pociones', filterRunes: 'Runas', filterArrows: 'Flechas', filterGrenades: 'Granadas', filterScrolls: 'Pergaminos'
  },
  de: {
    settingsTitle: 'Einstellungen', changeLang: 'Sprache ändern', deleteProg: 'Fortschritt löschen', currentLang: 'Deutsch',
    homeTitle: 'Startseite', searchRecipe: 'Rezept suchen...', advancedFilters: 'Erweiterte Filter', recentCrafts: 'Letzte Herstellung',
    inventoryTitle: 'Inventar', searchIngredient: 'Zutat suchen...', tabOwned: 'Im Besitz', tabMissing: 'Fehlend', noItems: 'Keine Items gefunden.',
    craftingTitle: 'Herstellung', inBag: 'In Tasche', missing: 'Fehlt',
    favoritesTitle: 'Favoriten', filterModalTitle: 'Herstellungen',
    filterAll: 'Alle', filterFoods: 'Essen', filterPotions: 'Tränke', filterRunes: 'Runen', filterArrows: 'Pfeile', filterGrenades: 'Granaten', filterScrolls: 'Schriftrollen'
  }
};

export const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: any) {
  const [lang, setLang] = useState<'pt-BR' | 'en' | 'es-AR' | 'de'>('pt-BR');

  const toggleLanguage = () => {
    if (lang === 'pt-BR') setLang('en');
    else if (lang === 'en') setLang('es-AR');
    else if (lang === 'es-AR') setLang('de');
    else setLang('pt-BR');
  };

  const t = (key: keyof typeof dictionary['pt-BR']) => {
    return dictionary[lang][key];
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);