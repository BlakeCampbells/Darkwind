# A small palette, with room for your next idea.
module Darkwind
  BACKGROUND = '#111827'.freeze

  class Palette
    attr_reader :name, :colors

    def initialize(name: 'Darkwind')
      @name = name
      @colors = {
        cyan: '#a5f3fc',
        blue: '#60a5fa',
        violet: '#a78bfa',
        coral: '#ff7878',
        yellow: '#ffeb82'
      }
    end

    def describe(limit: 3)
      colors.first(limit).map do |color, hex|
        "#{color.to_s.capitalize}: #{hex}"
      end.join(' / ')
    end
  end
end

palette = Darkwind::Palette.new
puts "#{palette.name} - #{palette.colors.length} colors"
puts palette.describe(limit: 3)
