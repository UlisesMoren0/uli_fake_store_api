export const getCategoryDisplayName = (categoryId: string) => {
    const categoryNames: Record<string, string> = {
        '21': 'Ropa',
        '22': 'Electrónicos',
        '23': 'Muebles',
        '24': 'Zapatos',
        '25': 'Varios',
        '26': 'Nueva categoría',
        '32': 'Dexter 174',
        '42': 'Dexter 918',
        '40': 'Dexter 578',
        'dexter_929wwww': 'Dexter 929wwww',
        'dexter_592': 'Dexter 592',
        '41': 'Dexter 683',
        'dexter_676': 'Dexter 676',
        '44': 'Cadena',
        '58': 'Sabra dios q es esto',
        '60': 'Categoría de Prueba',
    };
    return categoryNames[categoryId] || categoryId;
};
