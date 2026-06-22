export function round(value, digits = 4) {
    const factor = 10 ** digits;
    return Math.round((value + Number.EPSILON) * factor) / factor;
}
export function formatNumber(value, digits = 4) {
    if (!Number.isFinite(value)) {
        return "無法計算";
    }
    return round(value, digits).toLocaleString("zh-TW", {
        maximumFractionDigits: digits
    });
}
export function formatPercent(value, digits = 2) {
    if (!Number.isFinite(value)) {
        return "無法計算";
    }
    return `${formatNumber(value * 100, digits)}%`;
}
export function parseNumberList(input) {
    return input
        .split(/[,，\s]+/)
        .map((part) => part.trim())
        .filter(Boolean)
        .map(Number)
        .filter((value) => Number.isFinite(value));
}
