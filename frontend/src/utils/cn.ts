import clsx from 'classnames';

export function cn(...inputs: Parameters<typeof clsx>) {
  return clsx(...inputs);
}
