export const libraryData = {
    patterns: {
        title: 'Паттерны',
        dir: 'patterns',
        groups: {
            creational: {
                title: 'Порождающие',
                items: [
                    { num: 1, name: 'Factory Method', path: 'patterns/creational/01-factory-method' },
                    { num: 2, name: 'Abstract Factory', path: 'patterns/creational/02-abstract-factory' },
                    { num: 3, name: 'Singleton', path: 'patterns/creational/03-singleton' },
                    { num: 4, name: 'Builder', path: 'patterns/creational/04-builder' },
                    { num: 5, name: 'Prototype', path: 'patterns/creational/05-prototype' },
                ]
            },
            structural: {
                title: 'Структурные',
                items: [
                    { num: 6, name: 'Adapter', path: 'patterns/structural/06-adapter' },
                    { num: 7, name: 'Bridge', path: 'patterns/structural/07-bridge' },
                    { num: 8, name: 'Composite', path: 'patterns/structural/08-composite' },
                    { num: 9, name: 'Decorator', path: 'patterns/structural/09-decorator' },
                    { num: 10, name: 'Facade', path: 'patterns/structural/10-facade' },
                    { num: 11, name: 'Flyweight', path: 'patterns/structural/11-flyweight' },
                    { num: 12, name: 'Proxy', path: 'patterns/structural/12-proxy' },
                ]
            },
            behavioral: {
                title: 'Поведенческие',
                items: [
                    { num: 13, name: 'Chain of Responsibility', path: 'patterns/behavioral/13-chain-of-responsibility' },
                    { num: 14, name: 'Command', path: 'patterns/behavioral/14-command' },
                    { num: 15, name: 'Interpreter', path: 'patterns/behavioral/15-interpreter' },
                    { num: 16, name: 'Iterator', path: 'patterns/behavioral/16-iterator' },
                    { num: 17, name: 'Mediator', path: 'patterns/behavioral/17-mediator' },
                    { num: 18, name: 'Memento', path: 'patterns/behavioral/18-memento' },
                    { num: 19, name: 'Observer', path: 'patterns/behavioral/19-observer' },
                    { num: 20, name: 'State', path: 'patterns/behavioral/20-state' },
                    { num: 21, name: 'Strategy', path: 'patterns/behavioral/21-strategy' },
                    { num: 22, name: 'Template Method', path: 'patterns/behavioral/22-template-method' },
                    { num: 23, name: 'Visitor', path: 'patterns/behavioral/23-visitor' },
                ]
            }
        }
    },
    architecture: {
        title: 'Архитектура приложений',
        dir: 'architecture',
        groups: {
            solid: {
                title: 'SOLID',
                items: [
                    { num: 1, name: 'Single Responsibility', path: 'architecture/solid/01-single-responsibility' },
                    { num: 2, name: 'Open-Closed', path: 'architecture/solid/02-open-closed' },
                    { num: 3, name: 'Liskov Substitution', path: 'architecture/solid/03-liskov-substitution' },
                    { num: 4, name: 'Interface Segregation', path: 'architecture/solid/04-interface-segregation' },
                    { num: 5, name: 'Dependency Inversion', path: 'architecture/solid/05-dependency-inversion' },
                ]
            },
            principles: {
                title: 'Принципы',
                items: [
                    { num: 1, name: 'DRY', path: 'architecture/principles/02-dry' },
                    { num: 2, name: 'KISS', path: 'architecture/principles/03-kiss' },
                    { num: 3, name: 'YAGNI', path: 'architecture/principles/04-yagni' },
                ]
            },
            cleanArch: {
                title: 'Clean Architecture',
                items: [
                    { num: 1, name: 'Clean Architecture', path: 'architecture/clean-architecture/01-intro' },
                ]
            },
            cqrs: {
                title: 'CQRS',
                items: [
                    { num: 1, name: 'CQRS и Event Sourcing', path: 'architecture/cqrs/01-intro' },
                ]
            },
            di: {
                title: 'Dependency Injection',
                items: [
                    { num: 1, name: 'Dependency Injection', path: 'architecture/di/01-intro' },
                ]
            },
            ddd: {
                title: 'Domain-Driven Design',
                items: [
                    { num: 1, name: 'Domain-Driven Design', path: 'architecture/ddd/01-intro' },
                ]
            }
        }
    }
};
