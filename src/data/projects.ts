// La categoría es el nombre corto de uno de los servicios (data/services.ts): define el ícono de la tarjeta
export type ProjectCategory =
    | 'Software a medida'
    | 'Microservicios y cloud'
    | 'Plataformas web y móviles'
    | 'Automatización de procesos'
    | 'Integraciones y APIs'
    | 'Transformación digital'

export interface Project {
    id: string;
    category: ProjectCategory;
    title: string;
    /** Una o dos frases: qué problema resolvió y qué resultado dio */
    description: string;
    /** Tecnologías usadas (opcional) */
    tags?: string[];
    /** Enlace público al proyecto (opcional) */
    link?: string;
}

/**
 * Proyectos terminados que se muestran en /proyectos.
 * Mientras la lista esté vacía, la opción "Proyectos" del menú y la página se ocultan solas.
 * Para agregar uno, copia un bloque y cambia los textos.
 */
const projects: Project[] = [
    {
        id: 'mudanzas',
        category: 'Plataformas web y móviles',
        title: 'Plataforma para empresa de mudanzas',
        description:
            'Calcula la ruta del punto A al punto B, registra los kilómetros y comparte la ubicación en tiempo real. Con eso la empresa arma el presupuesto de cada mudanza en minutos, sin cálculos manuales.'
    },
    {
        id: 'erp-pos',
        category: 'Software a medida',
        title: 'ERP con punto de venta y tienda en línea',
        description:
            'Un solo sistema para vender en mostrador, en tienda en línea y en el sitio web. El inventario y las ventas de todos los canales quedan en el mismo lugar.'
    }
];

export const hasProjects = projects.length > 0;

export default projects;
