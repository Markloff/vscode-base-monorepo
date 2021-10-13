import React from 'react';
import { Pipeline, Stage } from '@/flow/Pipeline';
import 'reflect-metadata';
import {
	InstantiationService,
	ServiceCollection,
	SyncDescriptor,
	getSingletonServiceDescriptors,
	createDecorator,
	ServiceIdentifier,
} from 'vscode-base';


const stages: Stage[] = [
	{
		title: '编译',
		jobs: [
			{
				name: '编译',
				status: 'success',
				time: 61000,
			}
		]
	},
	{
		title: '部署',
		jobs: [
			{
				name: '部署',
				status: 'success',
				time: 129000,
			}
		]
	},
	{
		title: '代码扫描和检查',
		jobs: [
			{
				name: 'STC',
				status: 'success',
				time: 146000,
			},
			{
				name: 'PMD',
				status: 'success',
				time: 52000,
			}
		]
	},
	{
		title: '集成测试',
		jobs: [
			{
				name: '集成测试',
				status: 'fail',
				time: 334000,
			},
			{
				name: '单元测试',
				status: 'fail',
				time: 334000,
			}
		]
	}
]


interface IService1 {
	log(): void;
}
const IService1 = createDecorator<IService1>('IService1');

class Service1 implements IService1 {

	log() {
		console.log('Service1 执行log')
	}

}


interface IService2 {

	log(): void;
}

const IService2 = createDecorator<IService2>('IService2');

class Service2 implements IService2 {

	log() {
		console.log('Service2 执行log')
	}

}


class Application {
	private readonly instantiationService: InstantiationService;

	constructor() {
		this.instantiationService = this.initService();
	}

	initService(): InstantiationService {
		const serviceCollection = new ServiceCollection();

		for (const [id, descriptor] of getSingletonServiceDescriptors()) {
			serviceCollection.set(id, descriptor);
		}
		return new InstantiationService(serviceCollection, true);
	}

	getService<T>(id: ServiceIdentifier<T>): T {
		return this.instantiationService.invokeFunction(accessor => accessor.get(id));
	}

}
interface IService3 {

	log(): void;
}

const IService3 = createDecorator<IService3>('IService3');

class Service3 implements IService3 {

	constructor(
		@IService2 private readonly service2: IService2
	) {

	}

	log() {
		console.log('Service3 执行log，并且执行执行Service2的log')
		this.service2.log();
	}

}
const serviceCollection = new ServiceCollection();
serviceCollection.set(IService1, new SyncDescriptor<IService1>(Service1));
serviceCollection.set(IService2, new SyncDescriptor<IService2>(Service2));
serviceCollection.set(IService3, new SyncDescriptor<IService3>(Service3));

const instantiationService = new InstantiationService(serviceCollection);

instantiationService.invokeFunction(accessor => {


	const service1Instance = accessor.get(IService1);

	service1Instance.log();

	const service2Instance = accessor.get(IService2);

	service2Instance.log();

	const service3Instance = accessor.get(IService3);

	service3Instance.log();

})
function TestItem() {
	return (
		<div>
			<Pipeline stages={stages} />
		</div>
	);
}


export default function App() {
	return (
		<TestItem />
	);
}
