import React, { ReactSVGElement, useEffect, useMemo, useState } from 'react';

import moment from 'moment';
import './index.less';

interface Pipeline{
	stages: Stage[];
}

export interface Stage{
	title: string;
	jobs: Job[];
}

interface Job {
	name: string;
	status: 'success' | 'fail';
	time: number; //毫秒时间戳
}


interface Position {
	x: number;
	y: number;
}

interface SvgJoinLineProps {
	from: Position;
	to: Position;
	radius: number;
	strokeWidth: number;
	className?: string;
	style?: React.CSSProperties;
}

const SvgJoinLine: React.FC<SvgJoinLineProps> = (props) => {
	const { from, to, radius, strokeWidth, className = '', style = {} } = props;

	const { x: x1, y: y1 } = from;
	const { x: x2, y: y2 } = to;

	let path: string = '';

	const width = Math.abs(x1 - x2) + strokeWidth;
	const height = Math.abs(y1 - y2) === 0 ? strokeWidth * 2 : Math.abs(y1 - y2) + strokeWidth;

	const innerWidth = width;
	const innerHeight = height;

	if (y1 === y2) {
		path = `M ${0} ${height / 2} L ${innerWidth} ${height / 2}`;
	} else {
		if ((y2 - y1) / height < 0) {
			path =
				`M ${strokeWidth} ${innerHeight} L ${innerWidth / 2 - radius} ${innerHeight} ` +
				`Q ${innerWidth / 2} ${innerHeight} ${innerWidth / 2} ${innerHeight - radius} ` +
				`L ${innerWidth / 2} ${radius} ` +
				`Q ${innerWidth / 2} ${strokeWidth} ${innerWidth / 2 + radius} ${strokeWidth} ` +
				`L ${innerWidth} ${strokeWidth}`
		} else {
			path =
				`M ${strokeWidth} ${strokeWidth} L ${innerWidth / 2 - radius} ${strokeWidth} ` +
				`Q ${innerWidth / 2} ${strokeWidth} ${innerWidth / 2} ${radius} ` +
				`L ${innerWidth / 2} ${innerHeight - radius} ` +
				`Q ${innerWidth / 2} ${innerHeight} ${innerWidth / 2 + radius} ${innerHeight} ` +
				`L ${innerWidth} ${innerHeight}`
		}
	}
	return (
		<svg style={style} className={`mod_join_line ${className}`} width={innerWidth} height={height}>
			<path d={path} />
		</svg>
	)
}

const SvgIconDone: React.FC<ReactSVGElement['props']> = (props) => {

	return (
		<svg {...props} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
			<path d="M503.875 98.25C270.887 98.25 82 287.079 82 520.125S270.887 942 503.875 942c233.042 0 421.875-188.833 421.875-421.875S736.917 98.25 503.875 98.25z m0 787.5c-201.6 0-365.625-164.025-365.625-365.625S302.275 154.5 503.875 154.5 869.5 318.525 869.5 520.125 705.475 885.75 503.875 885.75z"
				data-spm-anchor-id="a313x.7781069.0.i0" fill="#8fb860" />
			<path
				d="M709.804 387.712l-261.45 261.45-149.625-149.625a28.143 28.143 0 0 0-39.771 0 28.143 28.143 0 0 0 0 39.771l169.479 169.538c5.513 5.512 12.713 8.212 19.913 8.212s14.4-2.758 19.912-8.212l281.304-281.363a28.152 28.152 0 0 0 0-39.77 28.139 28.139 0 0 0-39.762 0z"
				data-spm-anchor-id="a313x.7781069.0.i1" fill="#8fb860" />
		</svg>
	)
}

const SvgIconFail: React.FC<ReactSVGElement['props']> = (props) => {

	return (
		<svg {...props} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
			<path d="M512 0C229.232 0 0 229.232 0 512s229.232 512 512 512 512-229.232 512-512S794.768 0 512 0zM512 512 217.84 806.16C142.56 730.88 96 626.88 96 512 96 282.256 282.256 96 512 96L512 512z" fill="#bebebe" />
		</svg>
	)
}

const IconMap = {
	'success': SvgIconDone,
	'fail': SvgIconFail,
}

const formatTime = (time: number): string => {
	const duration = moment.duration(time , 'milliseconds');
	return [duration.hours(), duration.minutes(), duration.seconds()].map(refineTimeStr).join(':')
}

const refineTimeStr = (time: number): string => {
	if (time < 10) {
		return `0${time}`;
	}
	if (time > 99) {
		return '99';
	}
	return time.toString();
}

export const Pipeline: React.FC<Pipeline> = (props) => {
	const { stages = [] } = props;



	return (
		<div className={'mod_pipe_line'}>
			{/*<div className={'mod_join_line'}>*/}
			{/*	<div className={'arc right_top'} />*/}
			{/*	<div className={'line'} />*/}
			{/*</div>*/}
			{/*<SvgJoinLine strokeWidth={2} from={{x: 0, y: 0}} to={{ x: 50, y: 90 }}  radius={25}/>*/}
			<div className={'mod_pipe_line__inner'}>
				{stages.map((stage, stageIdx) => <StageComponent isFirst={stageIdx === 0} isLast={stageIdx === stages.length - 1} key={stageIdx} data={stage} idx={stageIdx} />)}
			</div>
		</div>
	);
}

interface StageProps {
	data: Stage;
	idx: number;
	isLast: boolean;
	isFirst: boolean;
}

interface Position {
	x: number;
	y: number;
}
const marginBottom = 20;
const StageComponent: React.FC<StageProps> = (props) => {
	const { data, idx, isLast, isFirst } = props;
	const { title, jobs } = data;
	const stageWrapperRef = React.createRef<HTMLDivElement>();
	const [stageWidth, setStageWidth] = useState<number>(0);

	useEffect(() => {
		getWrapperWidth();
		stageWrapperRef.current?.addEventListener('resize', getWrapperWidth)
	}, []);

	const getWrapperWidth = () => {
		const { width } = stageWrapperRef.current!.getBoundingClientRect();
		setStageWidth(width);
	}

	return (
		<div key={idx} className={'mod_stage'} ref={stageWrapperRef}>
			<p className={'stage_title'}>{title}</p>
			{jobs.map((job, jobIdx) => {
				return <JobComponent joinLeft={!isFirst} joinRight={!isLast} stageWidth={stageWidth} data={job} idx={jobIdx} key={jobIdx} />
			})}
		</div>
	)
}

interface JobProps {
	data: Job;
	idx: number;
	stageWidth: number;
	joinLeft: boolean;
	joinRight: boolean;
}

interface Size {
	width: number;
	height: number;
}

const JobComponent: React.FC<JobProps> = (props) => {
	const { data, idx, stageWidth, joinLeft, joinRight } = props;
	const { name, time, status } = data;
	const jobWrapperRef = React.createRef<HTMLDivElement>();
	const [domPosition, setDomPosition] = useState<Position & Size>({ x: 0, y: 0, width: 0, height: 0 });

	useEffect(() => {
		getWrapperWidth();
		jobWrapperRef.current?.addEventListener('resize', getWrapperWidth)
	}, []);

	const getWrapperWidth = () => {
		const { x, width, y, height } = jobWrapperRef.current!.getBoundingClientRect();
		setDomPosition({
			x,
			y,
			width,
			height
		})
	}
	const Icon = IconMap[status];

	const top = useMemo(() => {
		return domPosition.height * 0.5 - idx * (domPosition.height + marginBottom);
	}, [idx, domPosition.height]);

	return (
		<div key={idx} className={'mod_job'} ref={jobWrapperRef}>
			{joinLeft && <SvgJoinLine style={{ top: `${top}px`, marginLeft: - (stageWidth - domPosition.width) / 2 }} className={'mod_join_line_left'}  to={domPosition} from={{ x: domPosition.x - (stageWidth - domPosition.width) / 2, y: domPosition.y - (domPosition.height + marginBottom) * idx }} radius={10} strokeWidth={2} />}
			{joinRight && <SvgJoinLine style={{ top: `${top}px` }} className={'mod_join_line_right'} from={domPosition} to={{ x: domPosition.x + (stageWidth - domPosition.width) / 2, y: domPosition.y - (domPosition.height + marginBottom) * idx }} radius={10} strokeWidth={2} />}
			<Icon className={'mod_icon'} />
			<span>{name}</span>
			<span className={'mod_time'}>{formatTime(time)}</span>
		</div>
	)
}
