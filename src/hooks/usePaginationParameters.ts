import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {isNotEmpty} from "crowdsoft-utils-lib";

export type PaginationConfig = {
    firstPage?: number;
    defaultPerPage?: number;
    pageParam?: string;
    perPageParam?: string;
};

type Props = {
    config?: PaginationConfig;
    defaultConfig?: Required<PaginationConfig>;
    asSkipLimit?: boolean;
}

const initialConfig: Required<PaginationConfig> = {
    pageParam: "page",
    perPageParam: "perPage",
    firstPage: 1,
    defaultPerPage: 12
}

export const usePaginationParameters = ({ config, defaultConfig, asSkipLimit }: Props = {}): { page: number; perPage: number } => {
    const compiledConfig = useMemo((): Required<PaginationConfig> => {
        return { ...initialConfig, ...defaultConfig, ...config };
    }, [config, defaultConfig]);

    const params = useSearchParams();
    const queryPage = params.get(compiledConfig.pageParam);
    const queryPerPage = params.get(compiledConfig.perPageParam);

    const validatedPage = isNotEmpty(queryPage)
        ? parseInt(queryPage)
        : compiledConfig.firstPage;
    const validatedPerPage = isNotEmpty(queryPerPage)
        ? parseInt(queryPerPage)
        : compiledConfig.defaultPerPage;

    return {
        page: asSkipLimit ? (validatedPage - 1) * validatedPerPage : validatedPage,
        perPage: validatedPerPage,
    };
};
