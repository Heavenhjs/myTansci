/**
 * 显示当前时间（年月日时分秒）
 * @param {*} timeStamp 
 * @returns 
 */
 export function timeFormate(timeStamp:Date) {
    const year = new Date(timeStamp).getFullYear();
    const month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
    const date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
    const hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
    const mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
    const ss = new Date(timeStamp).getSeconds() < 10 ? "0" + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds();
    return year + "年" + month + "月" + date + "日" + hh + "时" + mm + '分' + ss + '秒';
}

/**
 * @description:  是否为数组
 */
 export function isArray(val: any): val is Array<any> {
	return val && Array.isArray(val);
}


/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
 export function filterEnum(
	callValue: any,
	enumData: { [key: string]: any } | undefined,
	searchProps?: { [key: string]: any },
	type?: string
): string {
	const value = searchProps?.value ?? "value";
	const label = searchProps?.label ?? "label";
	let filterData: any = {};
	if (Array.isArray(enumData)) filterData = enumData.find((item: any) => item[value] === callValue);
	if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
	return filterData ? filterData[label] : "--";
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
 export function formatValue(callValue: any) {
	// 如果当前值为数组,使用 / 拼接（根据需求自定义）
	if (isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";
	return callValue ?? "--";
}

