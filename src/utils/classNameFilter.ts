//multiple class를 활용하기 위한 함수
export const cx = (
  ...classNames: (string | undefined | null | false)[]
): string => {
  return classNames.filter(Boolean).join(" ");
};
