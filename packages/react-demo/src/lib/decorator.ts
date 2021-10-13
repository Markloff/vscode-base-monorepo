import "reflect-metadata";

const SELF_DECLARED_KEYS = 'self:paramtypes';

export default function Inject(key: 'client' | 'logger' | 'current' | 'context'): ParameterDecorator {
	console.log('run inject');
	return (
		target: Object,
		propertyKey: string | symbol,
		parameterIndex: number,
	) => {
		const args = Reflect.getMetadata(SELF_DECLARED_KEYS, target, propertyKey) || [];
		Reflect.defineMetadata(
			SELF_DECLARED_KEYS,
			[...args, { index: parameterIndex, type: key }],
			target,
			propertyKey,
		);
	};
}

