#pragma once

#include "winrt/Microsoft.ReactNative.h"

namespace winrt::progressbarapp::implementation {

    struct ProgressBarViewManager
        : winrt::implements<
        ProgressBarViewManager,
        winrt::Microsoft::ReactNative::IViewManager> {
    public:
        ProgressBarViewManager();

        // IViewManager
        winrt::hstring Name() noexcept;

        winrt::Windows::UI::Xaml::FrameworkElement CreateView() noexcept;
    };

} // namespace winrt::progressbarapp::implementation